import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrize } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);

function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const formErrors = useActionData(); //we can get access to whatever return form action, incase there was no submission

	const [withPriority, setWithPriority] = useState(false);
	const cart = useSelector(getCart);

	const username = useSelector((state) => state.user.username);

	const totaCartPrice = useSelector(getTotalPrize);
	const priorityPrice = withPriority ? totaCartPrice * 0.2 : 0;
	const totalPrize = totaCartPrice + priorityPrice;

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="mx-4">
			<h2 className="font-semibold text-xl mb-8 ">Ready to order? Let's go!</h2>

			<Form method="POST">
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5 ">
					<label className="sm:basis-40">First Name</label>
					<input
						className="input flex-grow"
						type="text"
						name="customer"
						defaultValue={username}
						required
					/>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5 ">
					<label className="sm:basis-40">Phone number</label>
					<div className="flex-grow">
						<input className="input w-full" type="tel" name="phone" required />
						{formErrors?.phone && (
							<p className="text-xs text-red-600 bg-red-100 rounded-md p-2 mt-2">
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5 ">
					<label className="sm:basis-40">Address</label>
					<div className="flex-grow">
						<input
							className="input w-full"
							type="text"
							name="address"
							required
						/>
					</div>
				</div>

				<div className="mb-12 flex items-center gap-5">
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
					/>
					<label className="font-medium" htmlFor="priority">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<Button disabled={isSubmitting} type="primary">
						{isSubmitting
							? "Placing order..."
							: `Order now from ${formatCurrency(totalPrize)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};

	const errors = {};
	if (!isValidPhone(order.phone))
		errors.phone =
			"Please provide your correct phone number. We might need it to contact you.";

	if (Object.keys(errors).length > 0) return errors;

	//if everything is okay, create the order and redirect
	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
