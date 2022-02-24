import express from 'express'
import ApiV1Routes from './routes/v1/index.js'
import config from "./config.js"
import session from "express-session"
import winston from "winston"

import {store} from "./services/mongoService.js";
import StaticRoutes from "./routes/static.js";

const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.cli()
})

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

app.use((req, res, next) => {
	if (req.url.startsWith('/api')) {
		res.on('finish', () => logger.info(`${req.method} ${req.url} ${res.statusCode}`))
	}
	next()
})


app.use(express.json())
app.use('/api/v1', ApiV1Routes)

app.use('/', StaticRoutes)

app.use((req, res, next) => {
	res.status(404).send()
	next()
})

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}`)
})