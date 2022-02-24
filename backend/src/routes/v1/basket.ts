import express from "express"
import {productService} from "../../services/modelServices.js";
import Basket from "../../../../models/basket.js";
import {stripe} from "../../util/stripe.js";
import config from "../../config.js";

const router = express.Router()

function getBasket(req: express.Request): Basket {
	if (!req.session.basket) {
		req.session.basket = { products: {} }
	}
	return req.session.basket;
}

router.get('/', (req, res) => {
	return res.json(getBasket(req))
})

type PostBody = {product: string, quantity?: number}

router.post('/', async (req, res) => {
	if (!req.body.product) return res.status(400).json({error: 'Product was missing'})

	const body = req.body as PostBody
	const product = await productService.find({urlSafeName: body.product})
	if (product.length == 0) return res.status(404).json({error: 'Product not found'})

	const basket = getBasket(req)
	if (basket.paymentIntent) {
		await stripe.paymentIntents.cancel(basket.paymentIntent.split('_secret')[0])
		delete basket.paymentIntent
	}
	const newQuantity = (basket.products[body.product] ?? 0) + (body.quantity ?? 1)
	if (newQuantity <= 0) delete basket.products[body.product]
	else basket.products[body.product] = newQuantity

	return res.json(basket)
})

router.get('/checkout', async (req, res) => {
	const basket = getBasket(req);
	if (!basket.username) {
		return res.status(400).json({error: 'Username has not been set'})
	}
	const pricesSummed = await Promise.all(Object.keys(basket.products).map(async name => {
			const product = await productService.find({urlSafeName: name})
			return product[0].price * basket.products[name]
		})
	)

	const totalCost = pricesSummed.reduce((prev, current) => prev + current)
	let intent;

	try {
		intent = await stripe.paymentIntents.create({
			amount: totalCost,
			currency: config.currency.iso,
			description: basket.username,
			metadata: {
				session: req.sessionID
			}
		})
	} catch (ex) {
		return res.status(500).send()
	}

	basket.paymentIntent = intent.client_secret ?? undefined
	return res.json(req.session.basket)
})

router.post('/setUsername', (req, res) => {
	const username = req.body.username;
	if (!username) return res.status(400).json({error: 'Missing username'})
	if (!username.match(/[A-Za-z_]{1,16}/)) return res.status(400).json({error: 'Invalid username'})
	const basket = getBasket(req);
	basket.username = req.body.username;
	return res.json(basket)
})

export default router

