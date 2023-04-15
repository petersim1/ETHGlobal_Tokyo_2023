import classNames from "classnames";

import styles from "../../styles/form.module.css";
import { InputI } from "../../types/inputs";

const InputField = (props: InputI): JSX.Element => {
  const {
    hideLabel,
    placeholder,
    value,
    type,
    label,
    errorMessage,
    valid,
    name,
    marginTop,
    ...rest
  } = props;

  return (
    <div className={classNames(styles.input_holder, { [styles.margin_top]: marginTop })}>
      <label
        className={classNames(styles.labeller, {
          [styles.hidden]: hideLabel,
        })}
      >
        {label}
      </label>
      <input
        className={classNames(styles.input_control, {
          [styles.invalid]: !valid,
        })}
        type={type}
        aria-invalid={!valid}
        placeholder={placeholder}
        value={value}
        name={name}
        {...rest}
      />
      <span
        className={classNames(styles.error_message, {
          [styles.show]: !valid,
        })}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default InputField;
