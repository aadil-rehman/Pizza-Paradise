import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	function handleSUbmit(e) {
		e.preventDefault();
		if (!query) return;
		navigate(`/order/${query}`);
		setQuery("");
	}

	return (
		<form onSubmit={handleSUbmit}>
			<input
				type="text"
				value={query}
				placeholder="Search order #"
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
}

export default SearchOrder;
