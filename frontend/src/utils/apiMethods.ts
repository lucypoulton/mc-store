import {Config} from "../../../models/config.js";
import {Product} from "../../../models/product.js";
import Basket from "../../../models/basket.js";

async function get<T>(path: string): Promise<T> {
	const result = await fetch(`/api/v1/` + path);
	return await result.json();
}

async function post<T>(path: string, body: any): Promise<T> {
	const result = await fetch(`/api/v1/` + path,
		{
			method: 'POST',
			body: JSON.stringify(body),
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		});
	return await result.json();
}

export const getConfig = () => get<Config>('config')

export const getProducts = () => get<Product[]>('products')

export const getBasket = () => get<Basket>('basket')
export const addProductToBasket = (productName: string) => post<void>('basket', {product: productName})
export const checkout = () => get<Required<Basket>>('basket/checkout')
export const setUsername = (username: string) => post<Basket>('basket/setUsername', {username})