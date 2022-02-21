import express from "express"
import config from "../../config.js"

const router = express.Router()

router.get('/', (_, res) => {
	const {stripeSecretKey, stripeWebhookSigningKey, port, mongoConnectionString, ...cloned} = config
	return res.json(cloned)
})

export default router