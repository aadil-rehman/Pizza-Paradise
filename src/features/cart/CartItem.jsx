import { formatCurrency } from "../../utils/helpers";

import DeleteButton from "../../ui/DeleteButton";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;
	const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

	return (
		<li className="py-3 sm:flex sm:justify-between sm:items-center ">
			<p className="mb-1 sm:mb-0">
				{quantity}&times; {name}
			</p>
			<div className="flex justify-between items-center  sm:gap-4">
				<p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>

				<UpdateItemQuantity
					pizzaId={pizzaId}
					currentQuantity={currentQuantity}
				/>
				<DeleteButton pizzaId={pizzaId} />
			</div>
		</li>
	);
}

export default CartItem;
