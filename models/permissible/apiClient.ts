/**
 * A client that carries out an action when a product is purchased.
 */
import {Transaction} from "../transaction.js";
import {Permissible} from "./permissible.js";

export interface ApiClient extends Permissible {
	/**
	 * The API key that will be used to generate SHA256 HMACs for authentication.
	 */
	apiKey: string,

	/**
	 * A name to display this client as.
	 */
	displayName: string,

	/**
	 * A list of transactions that this client is yet to process.
	 */
	outstandingTransactions: Transaction[]
}