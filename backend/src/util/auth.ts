import * as crypto from "crypto";
import {Request, Response, NextFunction} from "express";
import {clientService} from "../services/modelServices.js";
import {Permissible} from "../../../models/permissible/permissible.js";

/**
 * Given a Base64-encoded input string, returns a Base64-encoded SHA-256 hash.
 * @param token the token to hash
 */
export function getTokenHash(token: string) {
	const hash = crypto.createHash('sha256', {})
	hash.update(token, 'base64')
	return hash.digest().toString('base64')
}

export function authorise(filter: (permissible: Permissible) => boolean) {
	return async function (req: Request, res: Response, next: NextFunction) {
		function fail(message?: string) {
			return res.status(401).json({error: message ?? 'Invalid Authorization header'}).send()
		}

		if (!req.headers.authorization) return fail('Missing Authorization header')
		const [scheme, token] = req.headers.authorization.split(' ')
		if (!token) return fail()

		let permissible: Permissible

		switch (scheme) {
			case 'ApiKey':
				const hash = getTokenHash(token)
				console.log(hash)
				const client = await clientService.find({apiKey: hash})
				if (client.length == 0) return fail('Invalid API key')
				req.client = client[0]
				permissible = client[0]
				break

			// FIXME - THIS IS FOR TESTING ONLY - REMOVE!
			case 'TEST':
				permissible = {
					permissions: {
						manageProducts: true,
						manageClients: true
					}
				}
				break
			default:
				return fail(`Unknown authentication scheme ${scheme}`)
		}
		if (!permissible || !filter(permissible)) {
			return fail()
		}
		req.permissible = permissible
		next()
	}
}