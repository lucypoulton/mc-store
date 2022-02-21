import {MongoService} from "./mongoService.js";
import {Product} from "../../../models/product.js";
import {Transaction} from "../../../models/transaction.js";
import {ApiClient} from "../../../models/permissible/apiClient.js";
import {WithId} from "mongodb";

export const productService = new MongoService<Product>('products')

export const transactionService = new MongoService<Transaction>('transactions')

export const clientService = new MongoService<WithId<ApiClient>>('clients')