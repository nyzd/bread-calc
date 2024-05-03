// CALL WITH NO CACHE
export async function call(route: string, info?: object) {
    return await fetch(`${process.env.GITHUB_API_URL}${route}`, {
        ...info,
        cache: "no-cache",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        }
    });
}
