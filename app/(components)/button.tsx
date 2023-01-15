"use client";

import styles from "./button.module.css";

export default function Button({
	children,
	disabled,
}: { children: JSX.Element; disabled: boolean }) {
	return (
		<button
			style={disabled ? { background: "rgb(52 52 52 / 32%)" } : {}}
			disabled={disabled}
			className={styles.button}
		>
			{children}
		</button>
	);
}
