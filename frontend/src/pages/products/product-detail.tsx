import React, {useState} from 'react';
import {formatPrice, urlName} from "../../utils/product";
import {useParams} from "react-router-dom";
import {addProductToBasket} from "../../utils/apiMethods";
import {useQueryClient} from "react-query";
import {useConfig, useProducts} from "../../utils/queries";

export default function ProductDetail() {
	const products = useProducts();
	const config = useConfig().data!;
	const [loading, setLoading] = useState(false)
	const params = useParams();
	const product = products.data?.find(product => urlName(product.name) === params.product)
	const queryClient = useQueryClient()

	async function addToBasket() {
		if (loading) return
		setLoading(true)
		if (product) await addProductToBasket(product.urlSafeName)
		setLoading(false)
		await queryClient.invalidateQueries('basket')
	}

	if (!product) return <h1>404</h1>
	return <>
		<h1>{product.name}</h1>
			<button onClick={addToBasket}>Add to Basket - {formatPrice(product.price, config.currency)}</button>
		<p>{product.description}</p>
		</>
}