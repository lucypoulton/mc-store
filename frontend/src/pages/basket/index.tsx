import {RouteObject, Outlet} from "react-router-dom";
import {useBasket, useConfig, useProducts} from "../../utils/queries";
import './index.scss';
import {formatPrice, totalCost} from "../../utils/product";
import CheckoutComponent from "./checkout";
import {useContext, useEffect, useState} from "react";
import {checkout, setUsername} from "../../utils/apiMethods";
import {Elements} from "@stripe/react-stripe-js";
import {StripeContext} from "../../App";
import {SuccessComponent} from "./success";

export const BasketRoutes: RouteObject = {
	path: '/basket',
	element: <Outlet/>,
	children: [
		{
			path: '',
			element: <BasketComponent/>
		},
		{
			path: 'success',
			element: <SuccessComponent/>
		}
	]
}

export default function BasketComponent() {
	const basket = useBasket()
	const products = useProducts()
	const config = useConfig()
	const [username, setLocalUsername] = useState<string | undefined>(basket.data?.username)
	const stripe = useContext(StripeContext)
	const [paymentIntent, setPaymentIntent] = useState(basket.data?.paymentIntent)

	useEffect(() => {
		if (basket.data?.paymentIntent) setPaymentIntent(basket.data.paymentIntent)
	},
		[basket.data?.paymentIntent])

	async function onCheckoutClick() {
		if (username && basket.data?.username !== username) {
			await setUsername(username)
			console.log(`setting username to  ${username}`)
		}
		const {paymentIntent} = await checkout()
		setPaymentIntent(paymentIntent)
	}

	return <div className='basket-container'>
		<h1>Basket</h1>
		{basket.data ? <>
				<table>
					<tr>
						<th>Item</th>
						<th>Quantity</th>
					</tr>
					{basket.data && Object.entries(basket.data.products).map(entry => <tr key={entry[0]}>
						<td>{entry[0]}</td>
						<td>{entry[1]}</td>
					</tr>)}
				</table>
				{paymentIntent ?
					<Elements stripe={stripe} options={{clientSecret: paymentIntent}}>
						<CheckoutComponent />
					</Elements>: <>
						<input onInput={ev => {
							setLocalUsername(ev.currentTarget.value)
							console.log(ev.currentTarget.value)
						}} placeholder="Username"
							   defaultValue={basket.data?.username}/>
						{config.data &&
                            <button onClick={onCheckoutClick}>Checkout
                              - {formatPrice(totalCost(basket.data ?? {products: {}}, products.data ?? []), config.data.currency)}</button>
						}
					</>}
			</>
			: <h2>Your basket is empty</h2>}
	</div>
}