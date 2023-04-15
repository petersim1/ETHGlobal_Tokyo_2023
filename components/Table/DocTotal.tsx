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

  console.log(tokens);

  return (
    <div>
      <p>{loading ? "loading" : "not loading"}</p>
      <p>{ok ? "ok" : "not ok"}</p>
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
            <td>{tokens.length}</td>
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
