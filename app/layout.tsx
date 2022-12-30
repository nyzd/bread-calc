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
			<html lang="en">
				<body>
					<Header>
						<h3>Bread Calculator</h3>

						{github_status === 200 ? (
							<Status>
								<h3 style={{ color: "#72f372" }}>{delay}ms</h3>
							</Status>
						) : (
							<h3 style={{ color: "red" }}>Github api is Down</h3>
						)}
					</Header>
					{children}
				</body>
			</html>
		</>
	);
}
