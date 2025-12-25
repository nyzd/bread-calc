import Link from "next/link";
import styles from "./footer.module.css";
import * as React from "react";

export default function Footer({ children }: { children: React.ReactNode }) {
    return (
        <footer className={styles.footer}>
            {children}
        </footer>
    );
}
