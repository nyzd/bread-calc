export default async function Page() {
	return (
		<div>
			<form action="/repo/NatiqQuran/nq-api">
				<input type="text" placeholder="Repository URL" />
				<input type="submit" value="go" />
			</form>
		</div>
	);
}
