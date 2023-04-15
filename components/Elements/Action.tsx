import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/button.module.css";
import type { ActionI } from "../../types/button";

const Action = (props: ActionI): JSX.Element => {
  const { styling, disabled, link, ...rest } = props;

  let buttonColor;
  let imagePath;
  let imgHeight;
  let imgWidth;
  if (styling === "ready") {
    buttonColor = styles.green;
    imagePath = "/images/Bolt.svg";
    imgWidth = 8;
    imgHeight = 13;
  } else if (styling === "waiting") {
    buttonColor = styles.grey;
    imagePath = "/images/Clock.svg";
    imgWidth = 10;
    imgHeight = 10;
  } else {
    buttonColor = styles.dark;
    imagePath = "/images/Add.svg";
    imgWidth = 15;
    imgHeight = 15;
  }

  return (
    <Link href={link}>
      <button
        className={classNames(buttonColor, styles.action, {
          [styles.disabled]: disabled,
        })}
        aria-disabled={disabled}
        {...rest}
      >
        <div className={styles.action_holder}>
          <Image
            src={imagePath}
            alt="small logo"
            height={imgHeight}
            width={imgWidth}
            style={{ filter: styling === "dark" ? "invert(1)" : "invert(0)" }}
          />
          {styling === "ready" && <span>Ready to Sign</span>}
          {styling === "waiting" && <span>Waiting on Other Signee(s)</span>}
          {styling === "dark" && <span>New Doc</span>}
        </div>
      </button>
    </Link>
  );
};

export default Action;
