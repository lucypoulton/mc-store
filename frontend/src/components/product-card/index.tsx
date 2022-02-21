import './index.scss';
import {useContext} from "react";
import {ConfigContext} from "../../context";
import {formatPrice, urlName} from "../../utils/product";
import {useNavigate} from "react-router-dom";
import {Product} from "../../../../models/product.js";

export default function ProductCard({product}: {product: Product}) {
	const navigate = useNavigate();
	const config = useContext(ConfigContext);
	return <div className="productCard rounded" onClick={() => navigate(`/products/${urlName(product.name)}`)}>
		<h4>{product.name}</h4>
		<p>{product.description}</p>
		<p>{formatPrice(product.price, config.currency)}</p>
		</div>
}