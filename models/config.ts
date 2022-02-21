/**
 * Instance-specific configuration.
 */
export interface Config {
	/**
	 * The instance's name.
	 */
	name: string,
	/**
	 * The currency to charge in.
	 */
	currency: {
		/**
		 * The 3-letter ISO code.
		 */
		iso: string,
		/**
		 * The symbol to display.
		 */
		symbol: string,
		/**
		 * If true, then the symbol is a suffix, otherwise it is a prefix.
		 */
		symbolIsSuffix?: boolean,
		/**
		 * The denomination of this currency for display -
		 * n where the display unit is the lowest unit x 10^n.
		 * For example, there are 100 = 10^2 cents to the US dollar so USD has a value of 2.
		 * For zero-decimal currencies, set this to zero.
		 */
		denomination: number
	},
	theme: {
		font: {
			name: string,
			size?: string,
			weight?: number
		},
		main: [string, string],
		accent: [string, string],
		alt: [string, string],
		card: [string, string],
		shadow: string,
		roundedCorners: number
	},

	/**
	 * The Stripe publishable key to use.
	 */
	stripeKey: string
}

/**
 * Config stuff that shouldn't be sent to the client.
 */
export interface ServerConfig extends Config {
	/**
	 * The port that the server should listen on.
	 */
	port: number,

	/**
	 * The Stripe secret key to use.
	 */
	stripeSecretKey: string,

	/**
	 * The Stripe webhook signing key.
	 */
	stripeWebhookSigningKey: string,

	/**
	 * MongoDB connection string.
	 */
	 mongoConnectionString: string,

	/**
	 * The session secret to use.
	 */
	sessionSecret: string
}