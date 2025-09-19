import Image from "next/image";
import styles from "./styles.module.css";
import { get_org, } from "./api_functions";
import Scores, { ScoresFallback } from "./scores";
import { Suspense } from "react";
import git from "../../assets/g.svg";
import followers from "../../assets/followers.svg";

interface PageProps {
    params: Promise<{
        reponame: string[];
    }>;
}

function OrgDetail({ org }: { org: any }) {
    return (
        <div className={styles.orgDetail}>
            <Image
                alt="Avatar"
                src={org.avatar_url}
                width={65}
                height={65}
                className={styles.orgAvatar}
            />
            <h3>{org.login}</h3>

            <div className={styles.orgInfo}>
                <div>
                    <Image width={20}
                        height={20} alt="repos" src={git} />
                    <p title="Repos">{org.public_repos}</p>
                </div>

                <div>
                    <Image width={20}
                        height={20} alt="followers" src={followers} />
                    <p title="followers">{org.followers}</p>
                </div>
            </div>
        </div>
    )
}

export default async function Reponame( { params }: PageProps) {
    const { reponame } = await params;
    const org: any = reponame.length == 2 ? await get_org(reponame[0]) : null;

    return (
        <div className={styles.full_page}>
            <div className={styles.content}>
                {org ? <OrgDetail org={org} /> : ""}
                <div className={styles.scoreboard}>
                    <Suspense fallback={<ScoresFallback />}>
                        <Scores reponame={reponame} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
