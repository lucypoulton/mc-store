import {Outlet, RouteObject} from "react-router-dom";
import ProductCard from "../../components/product-card";
import ProductDetail from "./product-detail";
import './index.scss';
import {useQuery} from "react-query";
import {getProducts} from "../../utils/apiMethods";

export const ProductRoutes: RouteObject = {
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
	const products = useQuery('products', getProducts)

	return products.isLoading ?
		<h1>Loading...</h1>:
		<>
		<h1 className="center">Products</h1>
		<span className="product-categories rounded">
			<span>Category</span>
			<span>Category 2</span>
		</span>
		<div style={{display: 'flex', margin: '1em', gap: '1em'}}>
			{products.data?.map(product => <ProductCard key={product.name} product={product}/>)}
		</div>
	</>
}