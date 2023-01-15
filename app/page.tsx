import Form from "./form";
import styles from "./page.module.css";
import RandomQuote from "./quotes";

export default async function Page() {
	return (
		<div className={styles.page}>
			<Form />
			<div style={{ marginTop: "200px" }}>
				<RandomQuote />
			</div>
		</div>
	);
}
