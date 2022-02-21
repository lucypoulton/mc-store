import {ServerConfig} from "../../models/config.js";

const config : ServerConfig = {
	name: 'Example Server',
	currency: {
		iso: 'GBP',
		symbol: '£',
		denomination: 2
	},
	theme: {
		font: {
			name: 'Roboto',
			size: '1em',
			weight: 300
		},
		//main: ['#222', 'white'],
		main: ['white', 'black'],
		accent: ['#957', 'white'],
		alt: ['#559', 'white'],
		//card: ['#333', 'white'],
		card: ['#eee', 'black'],
		roundedCorners: 5,
		//shadow: '2px 3px 5px #2223',
		shadow: 'none'
	},
	port: 3000,
	// this one starts with 'pk' followed by either 'live' or 'test'
	stripeKey: 'pk_test_example',
	// as above, but with 'sk' instead of 'pk'
	stripeSecretKey: 'sk_test_example',
	// this one starts with 'whsec'
	stripeWebhookSigningKey: '',
	// your mongodb url
	mongoConnectionString: 'mongodb+srv://user:pass@url.mongodb.net/database',
	// a secure, random value, used to sign sessions
	sessionSecret: 'secret!'
}

export default config