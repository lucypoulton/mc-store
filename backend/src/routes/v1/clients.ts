import express from "express"
import {clientService} from "../../services/modelServices.js";
import {randomBytes} from "crypto";
import {authorise, getTokenHash} from "../../util/auth.js";
import {WithOptionalMember} from "../../util/withOptionalMember.js";
import {ApiClient} from "../../../../models/permissible/apiClient.js";

const router = express.Router()

const auth = authorise(p => p.permissions.manageClients ?? false)

router.get('/', auth, async (req, res) => {
	const clients = await clientService.getAll() as WithOptionalMember<ApiClient, 'apiKey'>[]
	for (let client of clients) delete client.apiKey
	return res.json(clients)
})

router.post('/', auth, async (req, res) => {
	const displayName = req.body.displayName;
	if (!displayName) return res.status(400).json({error: 'displayName is missing'})
	const apiKey = randomBytes(128).toString('base64')
	const apiKeyHashed = getTokenHash(apiKey)
	await clientService.insertDirect({
		displayName,
		apiKey: apiKeyHashed,
		outstandingTransactions: []
	})

	return res.json({apiKey: apiKey})
})

router.get('/queue', authorise(p => !!p.permissions.client), (req, res) =>
	res.json(req.client?.outstandingTransactions)
)

export default router