import { call } from "../../(githubApi)";
import styles from "./styles.module.css";
import Image from "next/image";

interface PageProps {
	params: {
		reponame: string[];
	};
}

async function get_repo_pulls(repopath: string[]) {
	const pathAsString = repopath.join("/");

	const response = await call(`/repos/${pathAsString}/pulls?state=closed`);

	return response.json();
}

export default async function Reponame({ params: { reponame } }: PageProps) {
	let score = new Map();
	const pulls: any[] = await get_repo_pulls(reponame);

	pulls.map((pull: any) => {
		if (score.has(pull.user.login)) {
			const lastCount = score.get(pull.user.login).count;
			score.set(pull.user.login, {
				count: lastCount + 1,
				avatar: pull.user.avatar_url,
			});
		} else {
			score.set(pull.user.login, {
				count: 1,
				avatar: pull.user.avatar_url,
			});
		}
	});

	const scoreArray = Array.from(score, ([name, value]) => ({
		name,
		value,
	})).sort((a, b) => b.value.count - a.value.count);

	return (
		<div>
			{/* <h1 style={{ textAlign: "center" }}>Pull request score board </h1> */}
			<div className={styles.scoreboard}>
				{scoreArray.map((value) => (
					<div className={styles.scoreItem}>
						<Image
							alt="Avatar"
							src={value.value.avatar}
							width={40}
							height={40}
						/>
						<h4 style={{ margin: "5px" }}>{value.name}</h4>
						<h2
							style={{
								textAlign: "center",
								color: "green",
								background: "#000",
								padding: "7px",
								width: "30px",
							}}
						>
							{value.value.count}
						</h2>
					</div>
				))}
			</div>
			<div className={styles.pulls}>
				{pulls.map((pull: any) => {
					return (
						<div className={styles.pull}>
							<Image
								alt="Avatar"
								src={pull.user.avatar_url}
								width={20}
								height={20}
							/>
							<h3>{pull.title}</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}
