import { ReactNode } from "react";
import styles from "./header.module.css";

export default function Header({ children }: { children: ReactNode[] }) {
    return <header className={styles.header}>{children}</header>;
}
