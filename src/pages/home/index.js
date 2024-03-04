import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";

export default function HomePage() {
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      toast.error("Please install MetaMask");
    }
  };

  const handleGetBalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
  };

  const changeWalletAccount = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", (account) => {
        setWalletAddress(account[0]);
        handleGetBalance(account[0]);
      });
    } else {
      toast.error("Please install MetaMask");
    }
  };

  useEffect(() => {
    changeWalletAccount();
    getCurrentWalletConnected();
  });

  return (
    <div className="h-screen">
      <div className="flex justify-end p-2 gap-2">
        {walletAddress ? (
          <Button outline>
            {walletAddress?.substring(0, 6)}...{walletAddress?.substring(38)}
          </Button>
        ) : (
          <Button primary onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <Button outline onClick={() => handleGetBalance(walletAddress)}>
          Get Balance
        </Button>
        <p>Balance:${balance}</p>
      </div>
    </div>
  );
}
