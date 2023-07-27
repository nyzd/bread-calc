export async function call(route: string, info?: object) {
    return await fetch(`${process.env.GITHUB_API_URL}${route}`, {
        ...info,
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        }
    });
}
