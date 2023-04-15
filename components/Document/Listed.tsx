/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

import Row from "./Row";
import { docFilter } from "../../utils/helpers";
import styles from "../../styles/document.module.css";

const Listed = (props: any): JSX.Element => {
  const { active, contracts, readyOnly, address } = props;

  console.log(contracts);

  const constractsFiltered = useMemo(() => {
    return docFilter(contracts, address, active, readyOnly);
  }, [contracts, address, active, readyOnly]);

  console.log(constractsFiltered);

  return (
    <div className={styles.doc_list_scrollable}>
      {constractsFiltered.map((r: any, i: number) => (
        <Row
          key={i}
          tokenid={r.tokenId}
          signedDisclosing={r.status.disclosing}
          signedReceiving={r.status.receiving}
          walletDisclosing={r.address.disclosing}
          walletReceiving={r.address.receiving}
          title={r.title}
          date={"Placeholder"}
          address={address}
        />
      ))}
    </div>
  );
};

export default Listed;
