import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;
	const dispatch = useDispatch();

	return (
		<li className="py-3 sm:flex sm:justify-between sm:items-center ">
			<p className="mb-1 sm:mb-0">
				{quantity}&times; {name}
			</p>
			<div className="flex justify-between items-center  sm:gap-4">
				<p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
				<Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
					Delete
				</Button>
			</div>
		</li>
	);
}

export default CartItem;
