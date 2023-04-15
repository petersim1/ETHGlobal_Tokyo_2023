import Link from "next/link";
import styles from "@/styles/Layout.module.css";
import Dropdown from "@/components/Elements/Dropdown";
import Connect from "./Connect";

const Sidebar = (): JSX.Element => {
  return (
    <nav className={styles.sidebar_nav}>
      <div className={styles.sidebar}>
        <Dropdown
          title="New Doc"
          icon={"/images/add.svg"}
          showArrow={true}
          style={{ fontSize: "1.75rem !important" }}
        >
          <ul>
            <li>
              <Link href="/new/SAFT">SAFT</Link>
            </li>
            <li aria-disabled={true} data-disabled={true}>
              SAFE
            </li>
            <li>
              <Link href="/new/NDA">NDA</Link>
            </li>
          </ul>
        </Dropdown>
        <Dropdown
          title="My Docs"
          icon={"/images/document.svg"}
          showArrow={true}
          style={{ fontSize: "1.75rem !important" }}
        >
          <ul>
            <li>
              <Link href="/view/SAFT">SAFT</Link>
            </li>
            <li aria-disabled={true} data-disabled={true}>
              SAFE
            </li>
            <li aria-disabled={true} data-disabled={true}>
              NDA
            </li>
          </ul>
        </Dropdown>
        <div className={styles.account}>
          <Connect />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
