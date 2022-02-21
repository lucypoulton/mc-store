import express from "express"
import BasketRouter from './basket.js'
import ConfigRouter from "./config.js"
import ProductsRouter from "./products.js"
import ServiceRouter from "../serviceRouter.js"
import {transactionService} from "../../services/modelServices.js"

const router = express.Router()

router.get('/', (req, res) => res.json({}))

router.use('/basket', BasketRouter)

router.use('/config', ConfigRouter)

router.use('/products', ProductsRouter)

router.use('/transactions', ServiceRouter(transactionService, '_id'))

export default router