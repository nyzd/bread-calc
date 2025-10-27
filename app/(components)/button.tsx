"use client";

import { ReactNode } from "react";
import styles from "./button.module.css";

export default function Button({
    children,
    style,
    disabled,
}: {
    children: ReactNode;
    disabled: boolean;
    style: object;
}) {
    return (
        <button
            className={styles.button}
            style={
                disabled ? { background: "rgb(52 52 52 / 32%)" } : { ...style }
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
