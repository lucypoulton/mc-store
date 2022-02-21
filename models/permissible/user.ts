/**
 * A user with administrative permissions.
 */
export default interface User {
	/**
	 * The user's name. Not necessarily a Minecraft username.
	 */
	username: string
}

/**
 * Additional properties for use on the server. These should not be sent to the client.
 */
export interface ServerUser extends User {
	/**
	 * Authentication information.
	 */
	auth: {
		passwordHash: string,
		salt: string,
	}
}