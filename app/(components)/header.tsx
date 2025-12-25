import styles from "./header.module.css";
import { JSX } from "react";

export default function Header({ children }: { children: JSX.Element[] }) {
    return <header className={styles.header}>{children}</header>;
}
