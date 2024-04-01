import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);

const fakeCart = [
	{
		pizzaId: 12,
		name: "Mediterranean",
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		pizzaId: 6,
		name: "Vegetale",
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		pizzaId: 11,
		name: "Spinach and Mushroom",
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const formErrors = useActionData(); //we can get access to whatever return form action, incase there was no submission

	// const [withPriority, setWithPriority] = useState(false);
	const cart = fakeCart;

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
						// value={withPriority}
						// onChange={(e) => setWithPriority(e.target.checked)}
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
					/>
					<label className="font-medium" htmlFor="priority">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<Button disabled={isSubmitting} type="primary">
						{isSubmitting ? "Placing order..." : "Order now"}
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
		priority: data.priority === "on",
	};

	const errors = {};
	if (!isValidPhone(order.phone))
		errors.phone =
			"Please provide your correct phone number. We might need it to contact you.";

	if (Object.keys(errors).length > 0) return errors;

	//if everything is okay, create the order and redirect
	const newOrder = await createOrder(order);
	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
