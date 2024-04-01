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
				className="px-4 py-2 rounded-full placeholder:text-stone-500 text-sm focus:outline-none focus:ring focus:ring-yellow-500 bg-yellow-100 focus:ring-opacity-50 sm:focus:w-72 w-28 sm:w-64 transition-all duration-300"
			/>
		</form>
	);
}


export default SearchOrder;
