import styles from "./status.module.css";
export default function Status({ children }: { children: JSX.Element }) {
	return <div className={styles.status}>{children}</div>;
}
