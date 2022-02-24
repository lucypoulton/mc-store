import express from "express"
import BasketRouter from './basket.js'
import ClientsRouter from "./clients.js"
import ConfigRouter from "./config.js"
import ProductsRouter from "./products.js"
import ServiceRouter from "../serviceRouter.js"
import {transactionService} from "../../services/modelServices.js"
import StripeWebhook from "./stripeWebhook.js";

const router = express.Router()

router.get('/', (req, res) => res.json({}))

router.use('/basket', BasketRouter)

router.use('/clients', ClientsRouter)

router.use('/config', ConfigRouter)

router.use('/products', ProductsRouter)

router.use('/transactions', ServiceRouter(transactionService, '_id'))

router.use('/stripe', StripeWebhook)

export default router