import {Service} from "./service.js";
import {Collection, MongoClient, OptionalUnlessRequiredId, WithId} from "mongodb";
import config from "../config.js";
import MongoStore from "connect-mongo";

export const client = await new MongoClient(config.mongoConnectionString).connect()

export const store = MongoStore.create({
	clientPromise: Promise.resolve(client),
})

/**
 * A service backed by a MongoDB collection
 * @param T the type of the object to return
 * @param U the shape of the object stored in the table
 */
export class MongoService<T extends U, U = T> implements Service<T> {
	private collection: Collection<U>;

	constructor(private collectionName: string, private outFn?: (u: WithId<U>) => T, private inFn?: (t: T) => U) {
		this.collection = client.db().collection(collectionName)
	}

	async find(query: Partial<T>): Promise<T[]> {
		const things = await this.collection.find(query).toArray()
		return things.map(this.outFn ?? (x => x as unknown as T));
	}

	getAll(): Promise<T[]> {
		return this.find({})
	}

	insertDirect(thing: U): Promise<any> {
		return this.collection.insertOne(thing as OptionalUnlessRequiredId<U>)
	}

	insert(thing: T): Promise<any> {
		const transformed = (this.inFn ?? (x => x as U))(thing)
		return this.insertDirect(transformed)
	}
}