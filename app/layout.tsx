import { call } from "./(githubApi)";
import Status from "./(components)/status";
import Header from "./(components)/header";

import "./global.css";

async function github_api_status() {
	const begin = Date.now();
	const response = await call("/octocat");
	const delay = Date.now() - begin;

	return [response.status, delay];
}

export default async function Layout({ children }: { children: JSX.Element }) {
	const [github_status, delay] = await github_api_status();
	return (
		<>
			<Header>
				<h1>Bread Calculator</h1>

				{github_status === 200 ? (
					<Status>
						<h3 style={{ color: "#72f372" }}>{delay}ms</h3>
					</Status>
				) : (
					<h3 style={{ color: "red" }}>Github api is Down</h3>
				)}
			</Header>
			{children}
		</>
	);
}
