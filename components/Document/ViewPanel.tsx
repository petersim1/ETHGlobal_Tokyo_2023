import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../Elements/Button";
import Tag from "../Elements/Tag";
import styles from "../../styles/docview.module.css";
import { ViewPanelI } from "../../types/documents";

const ViewPanel: React.FC<ViewPanelI> = (props): JSX.Element => {
  const { tokenId, docInfo, signedInfo, timeInfo } = props;

  const [sliderDone, setSliderDone] = useState(false);
  const [contractPending, setContractPending] = useState(false);
  const [contractSuccess, setContractSuccess] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.panel}>
      <div className={styles.form}>
        <div>
          <div className={styles.view_header}>
            <div>Signature Status</div>
            <div
              className={classNames(styles.can_sign, {
                [styles.show]: readySign,
              })}
            >
              <span>x</span>
              <span>Ready to Sign</span>
            </div>
          </div>
          <div className={styles.tag_holder}>
            <Tag address={docInfo.disclosing_wallet} ready={signedInfo.disclosing} fill />
            <Tag address={docInfo.receiving_wallet} ready={signedInfo.receiving} fill />
          </div>
        </div>
        {readySign && (
          <div className={styles.action_holder}>
            <Button
              large={true}
              styling="green"
              disabled={!sliderDone || contractPending || contractSuccess}
              onClick={handleSubmit}
              loader={contractPending}
            >
              {contractSuccess ? "Success!" : "Sign"}
            </Button>
          </div>
        )}
        {waitingSign && (
          <div className={classNames(styles.waiting_holder)}>
            <Image src="/images/svg/Clock.svg" alt="small logo" height={10} width={10} />
            <span>Waiting on Other Party</span>
          </div>
        )}
        {doneSign && (
          <a
            href={`https://${process.env.NEXT_PUBLIC_SCAN_ROOT_DOMAIN}/tx/${docInfo.nft_txn}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className={styles.receipt_holder_link}
          >
            <div className={styles.receipt_holder}>
              <p style={{ marginBottom: "15px" }}>Signing Complete!</p>
              <p style={{ marginBottom: "40px" }}>
                This document has been move to the "Closed Documents" tab on the Docs Page and a
                receipt has been issued.
              </p>
              <Image src="/images/Reciept.png" alt="receipt logo" height={115} width={205} />
              <p className={classNames(styles.mock_underline)} style={{ marginTop: "20px" }}>
                {docInfo.title}
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default ViewPanel;
