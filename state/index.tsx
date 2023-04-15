import { useState, createContext, ReactNode, FC, useMemo, useEffect } from "react";
import { INITIAL_STATE, INITIAL_STATE_CONTEXT } from "./constants";
import { StateContextType } from "./types";
import MetaMaskSDK from "@metamask/sdk";

// Our "auth" is dependent on client-facing applications, like wagmi + rainbow.
// isConnected & address will be populated before component mounts.
// It isn't a true auth, and upon every page load, the context gets reset, which
// includes our "auth" based on firestore + wallet address look ups.
// Once App mounts, sequential navigations won't call this useEffect again.
// It's only called upon page load. So, evaluate auth here as well as in login page.

// Putting this in _app.tsx didn't register the context update. Can't figure this out.
// Throwing it directly into the Provider here works well.

export const MetamaskContext = createContext<StateContextType>(INITIAL_STATE_CONTEXT);

export const MetamaskProvider: FC<{ supportedNetworks: string[]; children: ReactNode }> = ({
  supportedNetworks,
  children,
}) => {
  const [provider, setProvider] = useState<any>(INITIAL_STATE.provider);
  const [account, setAccount] = useState(INITIAL_STATE.account);
  const [isLoaded, setIsLoaded] = useState(INITIAL_STATE.isLoaded);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [chainId, setChainId] = useState(INITIAL_STATE.chainId);
  const [validChain, setValidChain] = useState(INITIAL_STATE.validChain);

  const requestAccount = (): void => {
    console.log("CLICKEd", provider);
    if (provider) {
      setIsLoading(true);
      provider
        .request({ method: "eth_requestAccounts", params: [] })
        .then((accounts: string[]) => {
          if (accounts) {
            setAccount(accounts[0]);
            setIsLoaded(true);
            setIsLoading(false);
          }
        })
        .catch((error: Error) => {
          console.log(error);
          setIsLoaded(false);
          setIsLoading(false);
        });
    }
  };

  const isSupportedNetwork = (id: string): void => {
    setValidChain(supportedNetworks.includes(id));
  };

  const handleAccountChange = (accounts: string[]): void => {
    if (accounts && provider) {
      setAccount(accounts[0]);
      provider.request({ method: "eth_chainId" }).then((chain: string) => {
        setChainId(chain);
        isSupportedNetwork(chain);
      });
    }
  };

  const handleChainChange = (chain: string): void => {
    setChainId(chain);
    isSupportedNetwork(chain);
    window.location.reload();
  };

  const handleConnect = (all: any): void => {
    console.log(all);
  };

  useEffect(() => {
    const MMSDK = new MetaMaskSDK();
    const ethereum = MMSDK.getProvider();
    if (ethereum) {
      setChainId(ethereum.chainId || "");
      setAccount(ethereum.selectedAccount || "");
      ethereum.on("accountsChanged", handleAccountChange);
      ethereum.on("chainChanged", handleChainChange);
      ethereum.on("connect", handleConnect);
      setProvider(ethereum);
      isSupportedNetwork(ethereum.chainId);
    }
    setIsLoaded(true);
    setIsLoading(false);

    return () => {
      if (ethereum) {
        ethereum.removeListener("accountsChanged", handleAccountChange);
        ethereum.removeListener("chainChanged", handleChainChange);
        ethereum.removeListener("connect", handleConnect);
      }
    };
  }, []);

  const value = useMemo(() => {
    return {
      provider,
      account,
      chainId,
      isLoading,
      isLoaded,
      isConnected: provider?.isConnected(),
      validChain,
      requestAccount,
    };
  }, [provider, account, isLoading, isLoaded]);

  return <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>;
};
