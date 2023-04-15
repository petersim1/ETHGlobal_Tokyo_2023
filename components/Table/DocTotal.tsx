import { useContext } from "react";
import { TokensContext } from "@/state/tokens";

const DocTotal = (): JSX.Element => {
  const { ok, loading, tokens } = useContext(TokensContext);

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
