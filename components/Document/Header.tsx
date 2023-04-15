import classNames from "classnames";

import styles from "../../styles/document.module.css";
import { DocsHeaderI } from "../../types/documents";

const Header = (props: DocsHeaderI): JSX.Element => {
  const { active, setActive, setTime, setChecked, time, numActive, numClosed } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  return (
    <div className={styles.header_holder}>
      <div
        className={classNames(styles.nav_holder, {
          [styles.active]: active,
        })}
      >
        <div
          className={classNames(styles.nav_select, { [styles.active]: active })}
          onClick={(): void => setActive(!active)}
        >
          <p>
            Active Documents<span>{numActive}</span>
          </p>
        </div>
        <div
          className={classNames(styles.nav_select, { [styles.active]: !active })}
          onClick={(): void => setActive(!active)}
        >
          <p>
            Closed Documents<span>{numClosed}</span>
          </p>
        </div>
      </div>
      <div className={classNames(styles.filtering)}>
        <div>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={handleChange}
            disabled={!active}
          />
          <label>Ready to Sign</label>
        </div>
        <div className={styles.separator} />
        <div>
          <span
            className={classNames({ [styles.active]: time === "week" })}
            onClick={(): void => setTime("week")}
          >
            W
          </span>
          <span
            className={classNames({ [styles.active]: time === "month" })}
            onClick={(): void => setTime("month")}
          >
            M
          </span>
          <span
            className={classNames({ [styles.active]: time === "year" })}
            onClick={(): void => setTime("year")}
          >
            Y
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
