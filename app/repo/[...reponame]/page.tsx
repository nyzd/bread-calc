import styles from "./styles.module.css";
import { get_org, } from "./api_functions";
import Scores, { ScoresFallback } from "./scores";
import { Suspense } from "react";

interface PageProps {
    params: {
        reponame: string[];
    };
}

export default async function Reponame({ params: { reponame } }: PageProps) {
    const org: any = await get_org(reponame[0]);
    return (
        <div>
            <div></div>
            <div className={styles.scoreboard}>
                <Suspense fallback={<ScoresFallback />}>
                    <Scores reponame={reponame} />
                </Suspense>
            </div>
        </div>
    );
}
