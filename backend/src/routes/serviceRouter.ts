import express from "express";
import {Service} from "../services/service.js";
import {WithId} from "mongodb";

export default function ServiceRouter<T>(service: Service<T>, idProperty: keyof WithId<T>) {
	const router = express.Router()

	router.get('/', async (req, res) => res.json(await service.getAll()))

	router.get('/:id', async (req, res) => {
		const thing = await service.find({[idProperty]: req.params.id} as unknown as Partial<T>)
		return thing.length > 0 ? res.json(thing[0]) : res.status(404).send()
	})

	return router
}