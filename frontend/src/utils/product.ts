import Basket from "../../../models/basket.js";
import {Product} from "../../../models/product";

export function urlName(name: string) {
	return name.toLowerCase().replace(/[^a-z0-9-]/, '-')
}

export function formatPrice(price: number, pricingInfo: {symbol: string, denomination: number, symbolIsSuffix?: boolean}) {
	const priceString =(price / (10 ** pricingInfo.denomination)).toFixed(pricingInfo.denomination)
	return pricingInfo.symbolIsSuffix ? `${priceString}${pricingInfo.symbol}` : `${pricingInfo.symbol}${priceString}`
}

export function countItems(basket: Basket) {
	return Object.values(basket.products).reduce((a, b) => a + b, 0)
}

export function totalCost(basket: Basket, products: Product[]) {
	return products.map(p => p.price * basket.products[p.urlSafeName] as number ?? 0).reduce((a, b) => a + b, 0)
}