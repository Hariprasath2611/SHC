🩺 SuiCare — Decentralized Healthcare Data Exchange

![SuiCare Banner](https://raw.githubusercontent.com/yourusername/suicare-frontend/main/cover.png)
*(Optional: replace with your actual project image or app screenshot)*

> ⚡ **Empowering patients with digital ownership of their medical data using Sui Blockchain and Walrus storage.**
> SuiCare allows patients to mint encrypted health records as **Data NFTs**, securely share them with hospitals or AI researchers, and earn rewards through a privacy-preserving marketplace.

🚀 Features

* 🧠 **Data Ownership NFTs:** Each medical record (lab report, imaging, prescription) is minted as a user-owned NFT.
* 🔒 **Client-side Encryption:** Files are encrypted before upload using AES-GCM for complete data privacy.
* ☁️ **Decentralized Storage (IPFS / Walrus):** Health data stored securely and verifiably.
* 🤝 **Sui Blockchain Integration:** Smart contracts written in Move manage minting, access requests, and rewards.
* 💡 **Zero-Knowledge Proof-ready:** Future support for ZK-based consent and privacy validation.
* 🧬 **AI Insights Layer (Planned):** Allow researchers to analyze anonymized datasets ethically.

 🧱 Tech Stack

| Layer                  | Technology                                                             |
| :--------------------- | :--------------------------------------------------------------------- |
| **Blockchain**         | [Sui Blockchain](https://sui.io/) + Move Smart Contracts               |
| **Storage**            | IPFS via [NFT.Storage](https://nft.storage/) (Walrus-ready)            |
| **Frontend**           | React + TypeScript + Vite                                              |
| **Wallet Integration** | [@mysten/wallet-kit](https://www.npmjs.com/package/@mysten/wallet-kit) |
| **Encryption**         | WebCrypto (AES-GCM + SHA-256)                                          |
| **AI Layer (Future)**  | TensorFlow / HuggingFace for data insights                             |

🧩 Architecture


┌──────────────────────────┐
│  Frontend (React + TS)  │
│  ─ Wallet Connection     │
│  ─ File Encryption       │
│  ─ NFT Minting UI        │
└────────────┬─────────────┘
             │
      Sui SDK (sui.js)
             │
┌────────────▼────────────┐
│     Sui Blockchain      │
│  Move Smart Contracts   │
│  (HealthNFT Module)     │
└────────────┬────────────┘
             │
     Encrypted File Upload
             │
┌────────────▼────────────┐
│     Walrus / IPFS       │
│   Decentralized Storage  │
└──────────────────────────┘




## 🧰 Folder Structure

```
suicare-frontend/
│
├── src/
│   ├── components/
│   │   └── UploadAndMint.tsx      # File upload & mint UI
│   ├── lib/
│   │   ├── crypto.ts              # AES encryption helpers
│   │   ├── storage.ts             # IPFS/Walrus upload logic
│   │   └── sui.ts                 # Blockchain minting logic
│   ├── App.tsx                    # Main layout & wallet connect
│   └── main.tsx                   # React entrypoint
│
├── public/                        # Static assets
├── .env                           # NFT.Storage API key
├── package.json
└── README.md
```

---

## 🧪 Usage Demo

1. Connect your **Sui Wallet** 🦊
2. Upload a mock medical record (PDF / image)
3. File is encrypted locally 🔐
4. Data is uploaded to IPFS and minted as a **HealthNFT**
5. View your NFT on [Sui Explorer – Testnet](https://testnet.suiexplorer.com/)

---

## 🧬 Future Roadmap

* ✅ MVP: Mint & encrypt health NFTs on Sui Testnet
* 🔄 Access Request Flow (Smart Contract + Consent UI)
* 🔒 Zero-Knowledge Proof of Consent
* 🧠 AI Layer: Anonymous data insights (disease risk, trends)
* 💰 Tokenomics: Reward patients for research data participation

---

## 🏗️ Smart Contract (Move)

Deployed Move module example:

```move
public fun mint(
  owner: address,
  content_cid: string::String,
  enc_key_hash: vector<u8>,
  kind: string::String,
  created_at_ms: u64,
  ctx: &mut TxContext
): HealthNFT { ... }
```

See full Move contract under `/contracts/sources/HealthNFT.move`.



## 👨‍💻 Author

**Hari Prasath D**
🧑‍💻 Full Stack Developer | Blockchain & Web3 Enthusiast
🌐 [GitHub](https://github.com/Hariprasath2611)
✉️ [hp5173690@gmail.com](mailto:hp5173690@gmail.com)



## 🪙 License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for details.



## 💬 Acknowledgements

* [Mysten Labs](https://mystenlabs.com/) for Sui Blockchain
* [NFT.Storage](https://nft.storage/) for decentralized storage
* [Vite](https://vitejs.dev/) + [React](https://react.dev/) for lightning-fast frontend
