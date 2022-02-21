import {Service} from "./service.js";
import {Collection, MongoClient} from "mongodb";
import config from "../config.js";
import MongoStore from "connect-mongo";

const client = await new MongoClient(config.mongoConnectionString).connect()

export const store = MongoStore.create({
	clientPromise: Promise.resolve(client),
})

export class MongoService<T> implements Service<T> {
	private collection: Collection;

	constructor(private collectionName: string) {
		this.collection = client.db().collection(collectionName)
	}

	async find(query: Partial<T>): Promise<T[]> {
		const things = await this.collection.find(query).toArray()
		return things as unknown as T[];
	}

	getAll(): Promise<T[]> {
		return this.find({})
	}

	insert(thing: T): Promise<any> {
		return this.collection.insertOne(thing)
	}
}

