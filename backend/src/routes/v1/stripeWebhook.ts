import express from "express";
import {stripe} from "../../util/stripe.js";
import config from "../../config.js";
import {Stripe} from "stripe";
import {store} from "../../services/mongoService.js";
import {SessionData} from "express-session";
const router = express.Router()

async function getSession(id: string) {
	return new Promise<SessionData | null>(resolve => store.get(id, (e, x) => resolve(x ?? null)))
}

router.post('/', async (req, res) => {
	const signature = req.headers['stripe-signature'];
	if (!signature) {
		return res.status(403).send()
	}

	let event;
	try {
		event = stripe.webhooks.constructEvent(req.body, signature, config.stripeWebhookSigningKey)
	} catch (ex) {
		return res.status(403).send()
	}

	if (event.type === 'payment_intent.succeeded') {
		const intent = event.data.object as Stripe.PaymentIntent

		const session = await getSession(intent.metadata.session);
		if (session) {
			store.destroy(intent.metadata.session)
		}
	}
	return res.status(204).send()
})

export default router