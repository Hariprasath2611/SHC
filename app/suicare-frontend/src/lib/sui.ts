// src/lib/sui.ts
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

// 👇 Polyfill for Buffer (required for browsers)
import { Buffer } from "buffer";

// Create client connection to Sui Testnet
export const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

// Replace with your real on-chain values
export const PACKAGE_ID = "0x<YOUR_PACKAGE_ID>";
export const MODULE_NAME = "health_nft";

/**
 * Mint a new HealthNFT on Sui blockchain.
 * @param wallet The connected wallet adapter (from @mysten/wallet-kit)
 * @param owner  Wallet address (currentAccount.address)
 * @param cid    The uploaded file CID (from Walrus/IPFS)
 * @param encKeyHashHex  SHA256 hash of encryption key (hex)
 * @param kind   Type of record (e.g., "lab_report")
 */
export async function mintHealthNFT(
  wallet: any,
  owner: string,
  cid: string,
  encKeyHashHex: string,
  kind: string
) {
  const tx = new TransactionBlock();

  // 🧩 Build the Move call
  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::mint`,
    arguments: [
      tx.pure.address(owner),
      tx.pure.string(cid),
      tx.pure(Uint8Array.from(Buffer.from(encKeyHashHex, "hex")), "vector<u8>"),
      tx.pure.string(kind),
      tx.pure.u64(Date.now()),
    ],
  });

  tx.setGasBudget(10_000_000);

  // ✅ Execute transaction through wallet adapter
  const result = await wallet.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: { showEffects: true },
  });

  console.log("✅ NFT minted:", result);
  return result;
}
