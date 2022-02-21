import express from 'express'
import routes from './routes/v1/index.js'
import config from "./config.js"
import session from "express-session"

import {store} from "./services/mongoService.js";
import Basket from "../../models/basket.js";

const app = express()

app.use(session({
	name: 'session_id',
	store: store,
	resave: false,
	saveUninitialized: false,
	secret: config.sessionSecret,
	cookie: {
		maxAge: 8.64e+7 // 1 day
	}
}))

declare module 'express-session' {
	interface SessionData {
		basket: Basket;
	}
}

app.use(express.json())
app.use('/', express.static('static'))
app.use('/api/v1', routes)

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}`)
})