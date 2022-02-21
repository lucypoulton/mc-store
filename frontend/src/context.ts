import {createContext} from "react";
import {ProductCategory} from "../../models/productCategory.js";
import {Config} from "../../models/config.js";

export const ConfigContext = createContext<Config>( {
	name: 'Example Server',
	currency: {
		iso: 'GBP',
		symbol: '£',
		denomination: 2
	},
	theme: {
		font: {
			name: 'Roboto',
			size: '1em',
			weight: 300
		},
		//main: ['#222', 'white'],
		main: ['white', 'black'],
		accent: ['#957', 'white'],
		alt: ['#559', 'white'],
		//card: ['#333', 'white'],
		card: ['#eee', 'black'],
		roundedCorners: 5,
		//shadow: '2px 3px 5px #2223',
		shadow: 'none'
	},
	stripeKey: 'pk_test_51KRKXlCoTum4IJl3T2Tly5sod3fdJ7oEpLH3LSn2s7yRggiKZ8IPY8ozhs0UOmTdXmEKkqPpN4CUCiKrE3vTMngA00N1fLGlGe'
});

export const ProductsContext = createContext<ProductCategory[]>([
	{
		name: 'Test',
		products: [
			{
				urlSafeName: 'test-product',
				name: "Test Product",
				description: 'An example product.',
				price: 7000,
				hasImage: false
			},
			{
				urlSafeName: 'test-product-2',
				name: "Test Product 2",
				description: "Another test product, this one has a really long description, isn't that cool? I just " +
					"need to keep on writing words to make sure everything is overflowing properly",
				price: 900,
				hasImage: false
			}
		]
	},
	{
		name: 'doge',
		products: [{
			urlSafeName: 'doge',
			name: 'doge',
			description: 'doge',
			price: 42069,
			hasImage: false
		}]
	},
]);
