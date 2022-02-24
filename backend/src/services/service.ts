/**
 * An abstraction around a database.
 */
export interface Service<T> {
	getAll(): Promise<T[]>,
	find(query: Partial<T>): Promise<T[]>
	insert(thing: T): Promise<any>
}