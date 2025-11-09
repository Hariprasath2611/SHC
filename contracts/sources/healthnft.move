module suicare::health_nft {

    use std::string;
    use sui::transfer;
    use sui::object::{Self, UID, ID};
    use sui::tx_context::TxContext;
    use sui::event;
    use sui::balance;
    use sui::coin::{Self as coin, Coin};
    use sui::sui::SUI;

    /// Registry to collect marketplace fees (MVP)
    struct Treasury has key {
        id: UID,
        admin: address,
        fees_collected: u64,
    }

    /// Each minted health record is an NFT-like object
    struct HealthNFT has key, store {
        id: UID,
        owner: address,
        content_cid: string::String,     // Walrus CID / content hash (immutable pointer)
        enc_key_hash: vector<u8>,        // hash of symmetric key; never store raw key
        kind: string::String,            // "lab_report" | "imaging" | "rx" etc.
        created_at_ms: u64,
    }

    struct AccessRequest has key {
        id: UID,
        requester: address,
        target: ID,          // HealthNFT::id
        msg: string::String, // purpose
        fee: u64,
        approved: bool,
    }

    struct MintedEvent has copy, drop {
        nft_id: ID,
        owner: address,
        content_cid: string::String,
        kind: string::String,
    }

    struct AccessRequestedEvent has copy, drop {
        req_id: ID,
        requester: address,
        nft_id: ID,
        fee: u64,
    }

    struct AccessApprovedEvent has copy, drop {
        req_id: ID,
        nft_id: ID,
    }

    public fun init(admin: address, ctx: &mut TxContext) {
        let t = Treasury {
            id: object::new(ctx),
            admin,
            fees_collected: 0
        };
        transfer::share_object(t);
    }

    /// Mint a HealthNFT owned by `owner`.
    public fun mint(
        owner: address,
        content_cid: string::String,
        enc_key_hash: vector<u8>,
        kind: string::String,
        created_at_ms: u64,
        ctx: &mut TxContext
    ): HealthNFT {
        let nft = HealthNFT {
            id: object::new(ctx),
            owner,
            content_cid,
            enc_key_hash,
            kind: kind,
            created_at_ms,
        };
        event::emit(MintedEvent {
            nft_id: object::id(&nft.id),
            owner,
            content_cid: nft.content_cid.clone(),
            kind: nft.kind.clone(),
        });
        nft
    }

    /// Transfer NFT to its owner’s address (user wallet)
    public fun deliver(nft: HealthNFT, recipient: address) {
        transfer::transfer(nft, recipient)
    }

    /// Request access by depositing a fee
    public fun request_access(
        t: &mut Treasury,
        nft_id: ID,
        msg: string::String,
        mut fee: Coin<SUI>,
        ctx: &mut TxContext
    ): AccessRequest {
        let amt = coin::value(&fee);
        t.fees_collected = t.fees_collected + amt;
        // Treasury holds the coin; burn coin to simplify MVP accounting
        coin::destroy_zero(coin::into_balance(fee));

        let req = AccessRequest {
            id: object::new(ctx),
            requester: tx_context::sender(ctx),
            target: nft_id,
            msg,
            fee: amt,
            approved: false,
        };
        event::emit(AccessRequestedEvent {
            req_id: object::id(&req.id),
            requester: req.requester,
            nft_id,
            fee: amt,
        });
        req
    }

    /// Owner approves; off-chain layer will release anonymized data via Walrus
    public fun approve(req: &mut AccessRequest, nft: &HealthNFT, approver: address, ctx: &mut TxContext) {
        assert!(nft.owner == approver, 1);
        req.approved = true;
        event::emit(AccessApprovedEvent {
            req_id: object::id(&req.id),
            nft_id: nft.id.id,
        });
    }
}
