import { useContext, useEffect } from "react";
import { MetamaskContext } from "@/state/wallet";
import { TokensContext } from "@/state/tokens";

const DocTotal = (): JSX.Element => {
  const { account, isConnected } = useContext(MetamaskContext);
  const { ok, loading, tokens, setTokens, setLoading, setOk } = useContext(TokensContext);

  useEffect(() => {
    if (!!account && isConnected) {
      setLoading(true);
      setOk(false);
      fetch(`/api/balance/SAFT?address=${account}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          console.log(result);
          setTokens(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      setTokens([]);
    };
  }, [isConnected, account]);

  return (
    <div>
      <p>{loading && "loading"}</p>
      <p>{ok && "ok"}</p>
      <table>
        <thead>
          <tr>
            <th>Document Type</th>
            <th>Total # Documents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SAFT</td>
            <td>{tokens ? tokens.length : 0}</td>
          </tr>
          <tr>
            <td>SAFE</td>
            <td>0</td>
          </tr>
          <tr>
            <td>NDA</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DocTotal;
