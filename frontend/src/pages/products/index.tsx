import {Outlet, RouteObject, useSearchParams} from "react-router-dom";
import {ProductsContext} from "../../context";
import {useContext} from "react";
import ProductCard from "../../components/product-card";
import ProductDetail from "./product-detail";
import './index.scss';

export const ProductRoute: RouteObject = {
	path: '/products',
	element: <ProductsComponent/>,
	children: [
		{path: '', element: <IndexComponent/>},
		{path: ':product', element: <ProductDetail/>}
	]
}

function ProductsComponent() {
	return <div className="product-container">
		<div className="product-sidebar rounded">
			<h2>Sidebar</h2>
			<p>put stuff here idk</p>
		</div>
		<div className="product-outlet">
			<Outlet/>
		</div>
	</div>
}

function IndexComponent() {
	const [params, setParams] = useSearchParams();
	const productCategories = useContext(ProductsContext);

	const category = productCategories.find(cat => cat.name === params.get('category')) ?? productCategories[0];

	return <>
		<h1 className="center">Products</h1>
		<span className="product-categories rounded">{productCategories.map(cat =>
		<span key={cat.name} onClick={() => setParams({category: cat.name})}>{cat.name}</span>
		)}</span>
		<div style={{display: 'flex', margin: '1em', gap: '1em'}}>
			{productCategories
				.filter(cat => cat.name === category?.name)
				.flatMap(cat => cat.products)
				.map(product => <ProductCard key={product.name} product={product}/>)}
		</div>
	</>
}