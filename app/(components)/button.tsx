"use client";

import styles from "./button.module.css";

export default function Button({ children }: { children: JSX.Element }) {
	return <button className={styles.button}>{children}</button>;
}
