import React, { useState } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { genKey, exportRawKey, encryptData, sha256 } from "../lib/crypto";
import { uploadToStorage } from "../lib/storage";
import { mintHealthNFT } from "../lib/sui";

export default function UploadAndMint() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();

  const handleUpload = async () => {
    if (!file || !currentAccount) return;

    setStatus("Encrypting file...");
    const data = await file.arrayBuffer();
    const key = await genKey();
    const { ciphertext } = await encryptData(data, key);
    const rawKey = await exportRawKey(key);
    const keyHashHex = await sha256(rawKey);

    setStatus("Uploading to decentralized storage...");
    const cid = await uploadToStorage(new Uint8Array(ciphertext));

    setStatus("Minting NFT on Sui...");
    const txResult = await mintHealthNFT(
      { signAndExecuteTransactionBlock },
      currentAccount.address,
      cid,
      keyHashHex,
      "lab_report"
    );

    console.log("Transaction Result:", txResult);
    setStatus("✅ Minted successfully!");
  };

  return (
    <div className="mt-4 border p-4 rounded-lg max-w-md">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Upload & Mint
      </button>
      <div className="mt-3 text-sm text-gray-700">{status}</div>
    </div>
  );
}
