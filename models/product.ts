/**
 * A product that can be sold.
 */
export interface Product {
	/**
	 * This product's URL-safe name.
	 */
	urlSafeName: string
	/**
	 * A unique name for the product.
	 */
	name: string,

	/**
	 * A longer description of the product.
	 */
	description: string,

	/**
	 * Whether this product has an image.
	 */
	hasImage: boolean,

	/**
	 * The price of this product, in the smallest currency unit.
	 * @see https://stripe.com/docs/currencies#zero-decimal
	 */
	price: number,
}