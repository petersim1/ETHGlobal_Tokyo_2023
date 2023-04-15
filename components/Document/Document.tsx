import classNames from "classnames";

import styles from "../../styles/document.module.css";
import DocumentItem from "./DocumentItem";
import { DocumentViewI } from "../../types/documents";

const Document: React.FC<DocumentViewI> = (props): JSX.Element => {
  const { doc, fields, tried, active, valid, edit } = props;

  const forceFocus = (event: React.MouseEvent<HTMLElement>): void => {
    if (!edit) return;
    const { name } = event.currentTarget.dataset;
    const el = document.querySelector(`input[name="${name}"]`) as HTMLElement;
    if (el) {
      el.focus();
    }
  };

  return (
    <div className={styles.document_holder}>
      <div
        className={classNames(styles.document_title, {
          [styles.empty]: !fields.title,
          [styles.selected]: edit && active && active.title,
          [styles.error]: edit && valid && tried && !(valid.title || !tried.title),
        })}
        data-name="title"
        onClick={forceFocus}
      >
        {fields.title || "."}
      </div>
      <div className={classNames(styles.document_text)}>
        {doc.map((item, i: number) => (
          <DocumentItem
            type={item.type}
            items={item.items}
            key={i}
            fields={fields}
            active={active}
            valid={valid}
            tried={tried}
            edit={edit}
          />
        ))}
      </div>
    </div>
  );
};

export default Document;
