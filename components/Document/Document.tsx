import classNames from "classnames";

import font from "../../styles/font.module.css";
import styles from "../../styles/docview.module.css";
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
        className={classNames(font.font_space, font.wt_700, font.size_24, styles.document_title, {
          [styles.empty]: !fields.title,
          [styles.selected]: edit && active && active.title,
          [styles.error]: edit && valid && tried && !(valid.title || !tried.title),
        })}
        data-name="title"
        onClick={forceFocus}
      >
        {fields.title || "."}
      </div>
      <div
        className={classNames(
          styles.document_text,
          font.font_aeonik_regular,
          font.wt_400,
          font.size_15,
        )}
      >
        {doc.map((item: any, i: number) => (
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
