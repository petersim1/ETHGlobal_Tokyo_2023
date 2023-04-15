import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/button.module.css";
import type { ReceiptI } from "../../types/button";

const Receipt = (props: ReceiptI): JSX.Element => {
  const { link, ...rest } = props;

  return (
    <Link href={link}>
      <button className={classNames(styles.receipt, styles.light)} {...rest}>
        <div className={styles.action_holder}>
          <span>View Receipt</span>
          <Image src="/images/svg/Arrow.svg" alt="small logo" height={8} width={8} />
        </div>
      </button>
    </Link>
  );
};

export default Receipt;
