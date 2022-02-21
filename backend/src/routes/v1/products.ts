import ServiceRouter from "../serviceRouter.js";
import {productService} from "../../services/modelServices.js";
import {Product} from "../../../../models/product.js";
import urlSafeName from "../../util/urlSafeName.js";
import {authorise} from "../../util/auth.js";

const router = ServiceRouter(productService, 'urlSafeName');

const productFields = [
	['name', 'string'],
	['description', 'string'],
	['hasImage', 'boolean'],
	['price', 'number'],
]

router.post('/', authorise(p => p.permissions.manageProducts ?? false), async (req, res) => {
	const newProduct: Product = req.body;
	for (const [field, type] of productFields) {
		if (!newProduct.hasOwnProperty(field) || typeof req.body[field] != type) {
			return res.status(400).json({error: `Missing property ${field}`})
		}
	}

	if (newProduct.price <= 0) {
		return res.status(400).json({error: `Price must be greater than 0`})
	}

	const existingProducts = await productService.find({urlSafeName: urlSafeName(newProduct.name)})
	if (existingProducts.length > 0) {
		return res.status(400).json({error: `A product with an overlapping name already exists`})
	}

	newProduct.urlSafeName = urlSafeName(newProduct.name)
	await productService.insert(newProduct)
	return res.json(newProduct)
})

export default router