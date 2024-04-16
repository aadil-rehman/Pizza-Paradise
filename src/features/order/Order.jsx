// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
	const order = useLoaderData();
	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div className="py-6 px-7 space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h2 className="text-xl font-semibold">Order #{id} Status</h2>

				<div className="space-x-2">
					{priority && (
						<span className="bg-red-500 rounded-full px-3 py-1 text-red-50 uppercase font-semibold tracking-wide text-sm">
							Priority
						</span>
					)}
					<span className="bg-green-500 rounded-full px-3 py-1 text-red-50 uppercase font-semibold tracking-wide text-sm">
						{status} order
					</span>
				</div>
			</div>

			<div className="bg-stone-200 px-6 py-5 flex items-center justify-between flex-wrap gap-2">
				<p className="font-medium">
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: "Order should have arrived"}
				</p>
				<p className="text-xs text-stone-500 ">
					(Estimated delivery: {formatDate(estimatedDelivery)})
				</p>
			</div>

			<ul className="divide-y border-b divide-stone-200 border-t">
				{cart.map((item) => (
					<OrderItem item={item} key={item.pizzaId} />
				))}
			</ul>

			<div className="bg-stone-200 px-6 py-5 space-y-2">
				<p className="text-sm font-medium text-stone-600">
					Price pizza: {formatCurrency(orderPrice)}
				</p>
				{priority && (
					<p className="text-sm font-medium text-stone-600">
						Price priority: {formatCurrency(priorityPrice)}
					</p>
				)}
				<p className="font-bold">
					To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
}

export async function loader({ params }) {
	const order = await getOrder(params.orderId);
	return order;
}

export default Order;
