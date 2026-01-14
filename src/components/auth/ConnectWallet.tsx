import React, { useEffect, useRef } from "react";

import { coinbaseWallet } from "../../connectors/coinbaseWallet";
import { metaMask } from "../../connectors/metaMask";
import { walletConnect } from "../../connectors/walletConnect";

import Metamask from "../../assets/wallet/Metamask.svg";
import Phantom from "../../assets/wallet/Phantom.svg";
import Coinbase from "../../assets/wallet/Coinbase.svg";
import WalletConnect from "../../assets/wallet/WalletConnect.svg";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWallet: React.Dispatch<
    React.SetStateAction<"MetaMask" | "WalletConnect" | "Coinbase" | null>
  >;
}
const ConnectWallet: React.FC<ConnectModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedWallet,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const id = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(id);
    };
  }, [isModalOpen, setIsModalOpen]);
  const activateConnector = async (label: string) => {
    let connector = null;
    switch (label) {
      case "MetaMask":
        await metaMask.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "injected");
        connector = metaMask;
        break;

      case "WalletConnect":
        await walletConnect.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "wallet_connect");
        connector = walletConnect;
        break;

      case "Coinbase":
        await coinbaseWallet.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "injected");
        connector = coinbaseWallet;
        break;

      default:
        break;
    }
    if (connector == null) {
      throw new Error("Failed to connect wallet");
    }

    if (!connector.provider) {
      throw new Error("Failed to connect wallet");
    }

    // Get the provider
    const walletProvider = await connector.provider;
    
    // Verify we have accounts
    const accounts = await walletProvider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    
    const address = accounts[0];
    
    // Only proceed with signature if connection succeeded
    const message = `Sign this message to authenticate with Labrys Eco.\n\nNonce: ${Date.now()}`;
    const signature = await walletProvider.request({
      method: 'personal_sign',
      params: [message, address],
    });
  };
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-wallet-title"
        >
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              className="w-full max-w-md rounded-2xl bg-custom-gradient p-6 shadow-2xl outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                id="connect-wallet-title"
                className="text-3xl font-semibold text-white font-poppins"
              >
                Connect a wallet
              </h2>
              <div>
                <p className="self-start text-base leading-10 text-gray-300 font-inter">
                  Don't have an account?
                  <a
                    href="#aa"
                    className="ml-1 font-semibold text-primary-900-high-emphasis hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-900-high-emphasis/50 rounded-sm"
                 >
                    Register here
                  </a>
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => activateConnector("MetaMask")}
                    className="flex items-center gap-4 w-full rounded-lg border border-gray-600 p-3 text-left hover:border-gray-500 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:opacity-90"
                  >
                    <img src={Metamask} alt="Metamask" />
                    <span className="px-2 text-lg font-semibold text-white font-inter">
                      Continue with Metamask
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-4 w-full rounded-lg border border-gray-600 p-3 text-left hover:border-gray-500 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:opacity-90"
                  >
                    <img src={Phantom} alt="Phantom" />
                    <span className="px-2 text-lg font-semibold text-white font-inter">
                      Continue with Phantom
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => activateConnector("Coinbase")}
                    className="flex items-center gap-4 w-full rounded-lg border border-gray-600 p-3 text-left hover:border-gray-500 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:opacity-90"
                  >
                    <img src={Coinbase} alt="Coinbase" />
                    <span className="px-2 text-lg font-semibold text-white font-inter">
                      Continue with Coinbase
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => activateConnector("WalletConnect")}
                    className="flex items-center gap-4 w-full rounded-lg border border-gray-600 p-3 text-left hover:border-gray-500 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:opacity-90"
                  >
                    <img src={WalletConnect} alt="WalletConnect" />
                    <span className="px-2 text-lg font-semibold text-white font-inter">
                      Continue with WalletConnect
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
