import React from 'react';
import './index.scss';
import {Link} from "react-router-dom";
import {useBasket, useConfig} from "../../utils/queries";
import {countItems} from "../../utils/product";

export default function Navbar() {
	const basket = useBasket()
	const config = useConfig()

	return <>
		<nav>
			<Link to="/">{config.data!.name}</Link>
			<Link to="/basket" className='basket'>{basket.data === undefined ? 0 : countItems(basket.data)} items</Link>
		</nav>
		{config.data?.stripeKey.startsWith('pk_test') && <div className="accent navbar_test_mode">TEST MODE</div>}
	</>
}