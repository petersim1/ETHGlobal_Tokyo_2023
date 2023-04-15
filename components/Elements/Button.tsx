import classNames from "classnames";

import styles from "../../styles/button.module.css";
import type { ButtonI } from "../../types/button";

const Button = (props: ButtonI): JSX.Element => {
  const { styling, disabled, large, children, loader, ...rest } = props;

  let buttonColor;

  if (styling === "green") buttonColor = styles.green;
  if (styling === "red") buttonColor = styles.red;
  if (styling === "light") buttonColor = styles.light;
  if (styling === "dark") buttonColor = styles.dark;

  return (
    <button
      className={classNames(buttonColor, styles.button, {
        [styles.disabled]: disabled,
        [styles.large]: large,
      })}
      aria-disabled={disabled}
      {...rest}
    >
      {loader ? <div className={styles.loader} /> : children}
    </button>
  );
};

export default Button;
