import { call } from "../../(githubApi)";

export async function get_org(org_name: string) {
    const response = await call(`/orgs/${org_name}`);
    const json: any[] = await response.json();

    return json;
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

export async function get_all_pulls(repoPath: string[]) {
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
