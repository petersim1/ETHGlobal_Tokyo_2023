import classNames from "classnames";
import Image from "next/image";

import styles from "../../styles/button.module.css";
import type { TagI } from "../../types/button";

const Tag = (props: TagI): JSX.Element => {
  const { address, ready, fill } = props;

  let imagePath;
  let imgHeight;
  let imgWidth;
  if (ready) {
    imagePath = "/images/Check.svg";
    imgHeight = 10;
    imgWidth = 10;
  } else {
    imagePath = "/images/Uncheck.svg";
    imgHeight = 10;
    imgWidth = 10;
  }

  return (
    <div
      className={classNames(styles.tag, {
        [styles.ready]: ready,
        [styles.fill]: fill,
      })}
    >
      <div className={styles.action_holder}>
        <Image src={imagePath} alt="small logo" height={imgHeight} width={imgWidth} />
        <span className={styles.address}>{address}</span>
      </div>
    </div>
  );
};

export default Tag;
