import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";
import UploadAndMint from "./components/UploadAndMint";

export default function App() {
  const { currentAccount } = useWalletKit();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🩺 SuiCare — HealthNFT Minting</h1>
      <ConnectButton />
      {currentAccount ? (
        <>
          <p>Connected: {currentAccount.address}</p>
          <UploadAndMint />
        </>
      ) : (
        <p style={{ color: "gray" }}>Please connect your wallet.</p>
      )}
    </div>
  );
}
