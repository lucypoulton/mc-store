import {client, MongoService} from "./mongoService.js";
import {Transaction} from "../../../models/transaction.js";
import {ApiClient} from "../../../models/permissible/apiClient.js";

export class TransactionService extends MongoService<Transaction> {
	constructor() {
		super('transactions');
	}
	async insert(thing: Transaction) {
		await super.insert(thing)
		return client.db().collection<ApiClient>('clients').updateMany({}, {
			$addToSet: {
				outstandingTransactions: thing
			}
		})
	}
}