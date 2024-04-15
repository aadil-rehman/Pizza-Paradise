import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";

function MenuItem({ pizza }) {
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

	const dispatch = useDispatch();

	const currentQuantity = useSelector(getCurrentQuantityById(id));
	const isInCart = currentQuantity > 0;

	function handleAddToCart() {
		const newItem = {
			pizzaId: id,
			name,
			quantity: 1,
			unitPrice,
			totalPrice: unitPrice * 1,
		};
		dispatch(addItem(newItem));
	}

	return (
		<li className="flex gap-4 py-2">
			<img
				src={imageUrl}
				alt={name}
				className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
			/>
			<div className="flex flex-col flex-grow pt-0.5">
				<p className="font-medium">{name}</p>
				<p className="text-sm italic capitalize text-stone-500">
					{ingredients.join(", ")}
				</p>
				<div className="mt-auto flex items-center justify-between">
					{!soldOut ? (
						<p className="text-sm">{formatCurrency(unitPrice)}</p>
					) : (
						<p className="text-sm uppercase font-medium text-stone-500">
							Sold out
						</p>
					)}

					{isInCart && (
						<div className="flex items-center gap-3 sm:gap-6">
							<UpdateItemQuantity
								pizzaId={id}
								currentQuantity={currentQuantity}
							/>
							<DeleteButton pizzaId={id} />
						</div>
					)}

					{!soldOut && !isInCart && (
						<Button type="small" onClick={handleAddToCart}>
							ADD TO CART
						</Button>
					)}
				</div>
			</div>
		</li>
	);
}

export default MenuItem;
