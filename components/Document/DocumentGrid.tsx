import styles from "../../styles/document.module.css";

const DocumentGrid = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className={styles.document_grid}>{children}</div>;
};

export default DocumentGrid;
