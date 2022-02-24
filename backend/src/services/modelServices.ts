import {MongoService} from "./mongoService.js";
import {Product} from "../../../models/product.js";
import {ApiClient} from "../../../models/permissible/apiClient.js";
import {TransactionService} from "./transactionService.js";
import {WithOptionalMember} from "../util/withOptionalMember.js";

export const productService = new MongoService<Product>('products')

export const transactionService = new TransactionService()

export const clientService = new MongoService<ApiClient, Omit<ApiClient, 'permissions'>>(
	'clients',
	x => ({
		...x, permissions: {
			client: x._id.toString()
		}
	}),
	x => {
		const cloned = {...x} as WithOptionalMember<ApiClient, 'permissions'>;
		delete cloned.permissions
		return cloned
	}
)