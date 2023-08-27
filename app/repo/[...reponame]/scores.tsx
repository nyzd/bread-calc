import Image from "next/image";
import styles from "./styles.module.css";
import { get_all_pulls } from "./api_functions";

export const dynamic = 'force-dynamic';

export function ScoresFallback() {
    const style = `${styles.scoreItemLoading} mob`;
    return (
        <>
            <span className={style}></span>
            <span className={style}></span>
            <span className={style}></span>
            <span className={style}></span>
            <span className={style}></span>
            <span className={style}></span>
        </>
    )
}

export default async function Scores({ reponame }: { reponame: any[] }){
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
        <>
            {scoreArray.map((value, _index) => (
                <div className={`${styles.scoreItem} mob`}>
                    <Image
                        alt="Avatar"
                        src={value.value.avatar}
                        width={40}
                        height={40}
                    />
                    <h4 style={{ margin: "5px" }}>{value.name}</h4>
                    <p
                        className={styles.scoreItemValue}
                    >
                        {value.value.count}
                    </p>
                </div>
            ))}
        </>
    )
}
