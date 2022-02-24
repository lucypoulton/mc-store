import express from "express"
const router = express.Router()

const s = express.static('static')

router.use('/', s)
router.use((req, res, next) => {
	req.url = '/'
	next()
})
router.use('/', s)

export default router