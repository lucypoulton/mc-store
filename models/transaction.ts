/**
 * A transaction.
 */
import {Product} from "./product.js";

export interface Transaction {
	/**
	 * The user that made this transaction.
	 */
	username: string,
	/**
	 * The transaction's Stripe ID. Use this to look up further information.
	 */
	stripeId: string,

	/**
	 * The products that were paid for.
	 */
	items: Product[],
}