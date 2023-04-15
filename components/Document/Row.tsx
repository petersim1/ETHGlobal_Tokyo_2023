import { DocRowI } from "../../types/documents";
import Action from "../Elements/Action";
import Receipt from "../Elements/Receipt";
import Tag from "../Elements/Tag";
import styles from "../../styles/document.module.css";
import { canSign } from "../../utils/helpers";

const DocumentRow = (props: DocRowI): JSX.Element => {
  const {
    tokenid,
    title,
    // date,
    walletDisclosing,
    signedDisclosing,
    walletReceiving,
    signedReceiving,
    address,
  } = props;

  const { readySign, doneSign } = canSign(
    address,
    walletDisclosing,
    walletReceiving,
    signedDisclosing,
    signedReceiving,
  );
  const status = readySign ? "ready" : "waiting";

  // const datePretty = new Date(+String(date)).toLocaleDateString("en-us", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // });

  return (
    <div className={styles.row}>
      <div>
        <p>{title}</p>
        {/* <p style={{ opacity: 0.5 }}>{`Created on ${datePretty}`}</p> */}
        <div className={styles.tags_holder}>
          <Tag address={walletDisclosing} ready={signedDisclosing} />
          <Tag address={walletReceiving} ready={signedReceiving} />
        </div>
      </div>
      <div>
        {doneSign ? (
          <Receipt link={`/doc/view/${tokenid}`} />
        ) : (
          <Action styling={status} disabled={false} link={`/doc/view/${tokenid}`} />
        )}
      </div>
    </div>
  );
};

export default DocumentRow;
