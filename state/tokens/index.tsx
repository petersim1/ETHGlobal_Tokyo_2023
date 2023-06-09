import { useState, useEffect, createContext, ReactNode, FC, useMemo, useContext } from "react";
import { INITIAL_STATE_CONTEXT } from "./constants";
import { StateContextType, TokenTypeI } from "./types";
import { MetamaskContext } from "../wallet";

// Our "auth" is dependent on client-facing applications, like wagmi + rainbow.
// isConnected & address will be populated before component mounts.
// It isn't a true auth, and upon every page load, the context gets reset, which
// includes our "auth" based on firestore + wallet address look ups.
// Once App mounts, sequential navigations won't call this useEffect again.
// It's only called upon page load. So, evaluate auth here as well as in login page.

// Putting this in _app.tsx didn't register the context update. Can't figure this out.
// Throwing it directly into the Provider here works well.

export const TokensContext = createContext<StateContextType>(INITIAL_STATE_CONTEXT);

export const TokensProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<TokenTypeI[]>([]);

  const { account, isConnected } = useContext(MetamaskContext);

  useEffect(() => {
    if (!!account && isConnected) {
      setLoading(true);
      setOk(false);
      fetch(`/api/balance/SAFT?address=${account}`)
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          setTokens(result.tokens);
          setLoading(false);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [isConnected, account]);

  const value = useMemo(() => {
    return {
      ok,
      loading,
      tokens,
      setOk,
      setTokens,
      setLoading,
    };
  }, [account, tokens, loading, ok]);

  return <TokensContext.Provider value={value}>{children}</TokensContext.Provider>;
};
