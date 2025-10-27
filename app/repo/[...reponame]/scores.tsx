import Image from "next/image";
import styles from "./styles.module.css";
import { get_all_pulls } from "./api_functions";

export function OrgFallback() {
    return <div className={`${styles.scoreItemLoading} mob`}></div>;
}

export function ScoresFallback() {
    const style = `${styles.scoreItemLoading} mob`;
    return (
        <>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
            <div className={style}></div>
        </>
    );
}

export default async function Scores({ reponame }: { reponame: any[] }) {
    const pulls: any[] = await get_all_pulls(reponame);

    // Optimize score calculation using reduce instead of map + manual Map operations
    const scoreMap = pulls.reduce(
        (score: Map<string, { count: number; avatar: string }>, pull: any) => {
            const userLogin = pull.user.login;
            const existingScore = score.get(userLogin);

            if (existingScore) {
                score.set(userLogin, {
                    count: existingScore.count + 1,
                    avatar: pull.user.avatar_url, // Update avatar in case it changed
                });
            } else {
                score.set(userLogin, {
                    count: 1,
                    avatar: pull.user.avatar_url,
                });
            }

            return score;
        },
        new Map<string, { count: number; avatar: string }>()
    );

    // Convert to array and sort in one operation
    const scoreArray = Array.from(scoreMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value.count - a.value.count);

    return (
        <>
            {scoreArray.map(
                (
                    value: {
                        name: string;
                        value: { count: number; avatar: string };
                    },
                    index: number
                ) => (
                    <div className={`${styles.scoreItem} mob`} key={index}>
                        <Image
                            alt="Avatar"
                            src={value.value.avatar}
                            width={40}
                            height={40}
                        />
                        <h4 style={{ margin: "5px" }}>{value.name}</h4>
                        <p className={styles.scoreItemValue}>
                            {value.value.count}
                        </p>
                    </div>
                )
            )}
        </>
    );
}
