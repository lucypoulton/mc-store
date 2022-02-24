import {useQuery} from "react-query";
import {getBasket, getConfig, getProducts} from "./apiMethods";

export const useConfig = () => useQuery('config', getConfig)
export const useProducts = () => useQuery('products', getProducts)
export const useBasket = () => useQuery('basket', getBasket)