import { call } from "./(githubApi)";
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
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="preconnect" href="https://rsms.me/" />
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                </head>
                <body>
                    <Header>
                        <h3>Bread Calculator</h3>

                        {github_status === 200 ? (
                            <span title={`Connected to github api with delay ${delay}ms`} className="dot" style={{ background: "#27a127bf" }}></span>
                        ) : (
                            <span title="Cannot connect to the github api" className="dot" style={{ background: "#a71e1e" }}></span>
                        )}
                    </Header>
                    {children}
                </body>
            </html>
        </>
    );
}
