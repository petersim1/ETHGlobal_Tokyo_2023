import styles from "@/styles/Layout.module.css";

const Layout = ({ children }: React.PropsWithChildren): JSX.Element => {
  return <div className={styles.grid}>{children}</div>;
};

export default Layout;
