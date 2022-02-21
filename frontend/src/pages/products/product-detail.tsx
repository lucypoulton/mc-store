import React, {useContext} from 'react';
import {ConfigContext, ProductsContext} from "../../context";
import {formatPrice, urlName} from "../../utils/product";
import {useParams} from "react-router-dom";
import {PaymentElement} from "@stripe/react-stripe-js";

export default function ProductDetail() {
	const categories = useContext(ProductsContext);
	const config = useContext(ConfigContext);
	const params = useParams();
	const product = categories.flatMap(x => x.products)
		.find(product => urlName(product.name) === params.product)

	if (!product) return <h1>404</h1>
	return <>
		<h1>{product.name}</h1>
			<button>Buy Now - {formatPrice(product.price, config.currency)}</button>
		<PaymentElement />
		<p>{product.description}</p>
		</>
}