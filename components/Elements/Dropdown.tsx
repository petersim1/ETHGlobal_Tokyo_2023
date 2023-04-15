/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import classNames from "classnames";

import styles from "@/styles/elements.module.css";

type DropdownI = {
  title: string;
  showArrow?: boolean;
  smoothTransition?: boolean;
  icon?: string;
  children: React.ReactNode;
  [x: string]: any;
};

const Dropdown: React.FC<DropdownI> = ({
  title,
  showArrow = true,
  smoothTransition = true,
  icon,
  children,
  ...rest
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleDrop = (): void => {
    if (ref.current) {
      if (open) {
        ref.current.style.height = "0px";
        setOpen(false);
      } else {
        const child = ref.current.querySelector("div");
        if (child) {
          const { height: heightChild } = child.getBoundingClientRect();
          ref.current.style.height = heightChild + "px";
        }
        setOpen(true);
      }
    }
  };

  return (
    <div {...rest} className={styles.dropdown_holder}>
      <div onClick={handleDrop} className={styles.title_holder}>
        {icon && (
          <span className={styles.icon}>
            <img src={icon} />
          </span>
        )}
        <span className={styles.title}>{title}</span>
        {showArrow && (
          <span className={classNames(styles.arrow, { [styles.active]: open })}>
            <img src="/images/carat-right.svg" />
          </span>
        )}
      </div>
      <div ref={ref} className={classNames(styles.dropdown, { [styles.smooth]: smoothTransition })}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
