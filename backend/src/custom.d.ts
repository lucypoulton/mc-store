import Basket from "../../models/basket.js";
import {Permissible} from "../../models/permissible/permissible.js";
import {ApiClient} from "../../models/permissible/apiClient.js";

declare module 'express-session' {
	interface SessionData {
		basket: Basket;
	}
}

declare module 'express-serve-static-core' {
	interface Request {
		permissible?: Permissible
		client?: ApiClient;
	}
}