import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import Username from "../features/user/Username";

function Header() {
	return (
		<header className="bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex items-center justify-between">
			<Link to="/" className="tracking-widest font-semibold text-xl">
				Pizza Paradise
			</Link>
			<SearchOrder />

			<Username />
		</header>
	);
}

export default Header;
