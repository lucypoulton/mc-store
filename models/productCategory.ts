import {Product} from "./product.js";

/**
 * A category of products.
 */
export interface ProductCategory {
	/**
	 * This category's name.
	 */
	name: string,

	/**
	 * The products that this category contains.
	 */
	products: Product[],
}