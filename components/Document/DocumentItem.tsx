import classNames from "classnames";
import { Fragment } from "react";
import { DocItemsI } from "../../types/documents";

import styles from "../../styles/docview.module.css";

const ParentEl = ({
  parentType,
  children,
}: {
  parentType: string;
  children: React.ReactNode;
}): JSX.Element => {
  if (parentType === "text") {
    return <p>{children}</p>;
  }
  if (parentType === "ol") {
    return <ol>{children}</ol>;
  }
  if (parentType === "signature") {
    return <div>{children}</div>;
  }
  return <></>;
};

const DocumentItem: React.FC<DocItemsI> = (props): JSX.Element => {
  const { type, items, fields, valid, tried, active, edit } = props;

  const forceFocus = (event: React.MouseEvent<HTMLElement>): void => {
    if (!edit) return;
    const { name } = event.currentTarget.dataset;
    const el = document.querySelector(`input[name="${name}"]`) as HTMLElement;
    if (el) {
      el.focus();
    }
  };

  return (
    <ParentEl parentType={type}>
      <>
        {items.map((item, i) => {
          if (!item.variable) {
            if (type == "ol") {
              return <li key={i}>{item.text}</li>;
            }
            return <Fragment key={i}>{item.text}</Fragment>;
          } else {
            // this condition doesn't actually matter, but typescript likes it.
            if (item.field) {
              return (
                <span
                  key={i}
                  data-name={item.field}
                  className={classNames({
                    [styles.empty]: !fields[item.field],
                    [styles.selected]: edit && active && active[item.field],
                    [styles.error]:
                      edit && valid && tried && !(valid[item.field] || !tried[item.field]),
                  })}
                  onClick={forceFocus}
                >
                  {(item.field && fields[item.field]) || "."}
                </span>
              );
            } else {
              return <></>;
            }
          }
        })}
      </>
    </ParentEl>
  );
};

export default DocumentItem;
