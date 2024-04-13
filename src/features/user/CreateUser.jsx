import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";

function CreateUser() {
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(username);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(username);
		if (!username) return;
		dispatch(updateName(username));
		navigate("/menu");
	}

	return (
		<form onSubmit={handleSubmit}>
			<p className="text-stone-600 mb-4 text-sm md:text-base">
				👋 Welcome! Please start by telling us your name:
			</p>

			<input
				type="text"
				placeholder="Your full name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="w-72 input mb-8"
			/>

			{username !== "" && (
				<div>
					<Button type="primary">Start ordering</Button>
				</div>
			)}
		</form>
	);
}

export default CreateUser;
