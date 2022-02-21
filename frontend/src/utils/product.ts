export function urlName(name: string) {
	return name.toLowerCase().replace(/[^a-z0-9-]/, '-')
}

export function formatPrice(price: number, pricingInfo: {symbol: string, denomination: number, symbolIsSuffix?: boolean}) {
	const priceString =(price / (10 ** pricingInfo.denomination)).toFixed(pricingInfo.denomination)
	return pricingInfo.symbolIsSuffix ? `${priceString}${pricingInfo.symbol}` : `${pricingInfo.symbol}${priceString}`
}