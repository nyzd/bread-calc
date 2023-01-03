import { call } from "../../(githubApi)";
import styles from "./styles.module.css";
import Image from "next/image";

interface PageProps {
	params: {
		reponame: string[];
	};
}

async function get_org_repos_list(org: string) {
	const response = await call(`/orgs/${org}/repos`);
	const json: any[] = await response.json();

	return json;
}

async function get_repo_pulls(
	org_name: string,
	repo_name: string,
	month: string | null,
) {
	const pathAsString = `${org_name}/${repo_name}`;

	const response = await call(`/repos/${pathAsString}/pulls?state=closed`);
	const json: any[] = await response.json();

	if (month) {
		const pulls = json.filter((value) => {
			const created_at = value.created_at.split("-");
			const path_date = month.split("-");

			return created_at[0] === path_date[0] && created_at[1] === path_date[1];
		});

		return pulls;
	}
	return json;
}

async function get_all_pulls(repoPath: string[]) {
	const orgName = repoPath[0];
	const repoName = Date.parse(repoPath[1]) ? undefined : repoPath[1];

	const month = (() => {
		// check if there is a date after org name
		if (Date.parse(repoPath[1])) {
			return repoPath[1];
		}

		return repoPath[2];
	})();

	// Check if repo full path is spcified
	// or user passed just org name
	if (repoName === undefined) {
		const org_repos = await get_org_repos_list(orgName);

		// Now get the all repos pull requests
		let pulls: any[] = [];

		for await (const repo of org_repos) {
			const repo_pulls = await get_repo_pulls(orgName, repo.name, month);

			repo_pulls.map((r) => {
				pulls.push(r);
			});
		}

		return pulls;
	}

	const pulls = await get_repo_pulls(orgName, repoName, month);

	return pulls;
}

export default async function Reponame({ params: { reponame } }: PageProps) {
	let score = new Map();
	const pulls: any[] = await get_all_pulls(reponame);

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
