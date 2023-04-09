import Form from "./form";
import styles from "./page.module.css";

export default async function Page() {
	return (
		<div className={styles.page}>
			<Form />
		</div>
	);
}
