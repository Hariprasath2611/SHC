import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletKitProvider } from "@mysten/wallet-kit";
import "@mysten/wallet-kit/dist/index.css"; // ✅ correct for v0.8.6

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletKitProvider>
      <App />
    </WalletKitProvider>
  </React.StrictMode>
);
