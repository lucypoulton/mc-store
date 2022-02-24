export interface Permissions {
	/**
	 * Can create, edit, delete, and alter prices of products.
	 */
	manageProducts: boolean,

	/**
	 * Can create, edit, delete, and alter clients.
	 */
	manageClients: boolean,
	/**
	 * Can act as a client with a given ID.
	 */
	client: string
}

/**
 * Something capable of holding a permission.
 */
export interface Permissible {
	permissions: Partial<Permissions>
}