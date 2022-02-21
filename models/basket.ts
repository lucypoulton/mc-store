/**
 * Products a user has selected for purchase.
 */
export default interface Basket {
	/**
	 * A map of product URL-safe names and their quantities.
	 */
	products: {[product: string]: number},

	/**
	 * The username to provide the products for. Setting this is required for a purchase to succeed.
	 */
	username?: string,

	/**
	 * The Stripe payment intent for the basket. Adding or removing an item will void this.
	 */
	paymentIntent?: string
}