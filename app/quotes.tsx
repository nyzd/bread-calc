import quotesData from "../assets/quotes.json";

interface Quote {
	author: string;
	content: string;
}

function selectRandomQuote(quotes: Quote[]): Quote {
	let randomNum = Math.floor(Math.random() * quotes.length);

	return quotes[randomNum];
}

export default function RandomQuoute() {
	const quote = selectRandomQuote(quotesData.quotes);
	return (
		<div style={{ background: "#8b8b8b17", padding: "20px" }}>
			<h3>“{quote.content}”</h3>- <p>{quote.author}</p>
		</div>
	);
}
