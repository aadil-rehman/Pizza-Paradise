import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";

function Header() {
	return (
		<header>
			<Link to="/"> Fast React Pizz Co.</Link>
			<SearchOrder />

			<p>Aadil</p>
		</header>
	);
}

export default Header;
