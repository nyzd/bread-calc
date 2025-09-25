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
  merged: boolean = true,
) {
  const pathAsString = `${org_name}/${repo_name}`;
  let allPulls: any[] = [];
  let page = 1;
  const perPage = 100; // Maximum allowed by GitHub API

  while (true) {
    try {
      const response = await call(`/repos/${pathAsString}/pulls?state=closed&per_page=${perPage}&page=${page}`, {});
      
      if (!response.ok) {
        console.error(`Failed to fetch pulls for ${pathAsString}, page ${page}: ${response.status}`);
        break;
      }

      const json: any[] = await response.json();
      
      if (json.length === 0) {
        break; // No more pages
      }

      allPulls = allPulls.concat(json);
      page++;

      // If we have a month filter, we can stop early if we've gone past the target month
      if (month) {
        const path_date = month.split("-");
        const targetYear = parseInt(path_date[0]);
        const targetMonth = parseInt(path_date[1]);
        
        // Check if the last pull request is before our target month
        const lastPull = json[json.length - 1];
        const lastPullDate = new Date(lastPull.created_at);
        const lastPullYear = lastPullDate.getFullYear();
        const lastPullMonth = lastPullDate.getMonth() + 1;
        
        if (lastPullYear < targetYear || (lastPullYear === targetYear && lastPullMonth < targetMonth)) {
          break; // We've gone past the target month
        }
      }
    } catch (error) {
      console.error(`Error fetching pulls for ${pathAsString}, page ${page}:`, error);
      break;
    }
  }

  if (month) {
    const pulls = allPulls.filter((value) => {
      const created_at = value.created_at.split("-");
      const path_date = month.split("-");

      if (merged) {
        return (
          created_at[0] === path_date[0] &&
          created_at[1] === path_date[1] &&
          value.merged_at !== null
        );
      }

      return created_at[0] === path_date[0] && created_at[1] === path_date[1];
    });

    return pulls;
  }
  return allPulls;
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

    // Fetch pull requests from all repositories in parallel
    const pullPromises = org_repos.map(async (repo: any) => {
      try {
        return await get_repo_pulls(orgName, repo.name, month);
      } catch (error) {
        console.error(`Error fetching pulls for ${orgName}/${repo.name}:`, error);
        return []; // Return empty array on error to continue processing other repos
      }
    });

    // Wait for all promises to resolve
    const pullResults = await Promise.all(pullPromises);
    
    // Flatten all results into a single array
    const allPulls = pullResults.flat();

    return allPulls;
  }

  const pulls = await get_repo_pulls(orgName, repoName, month);

  return pulls;
}
