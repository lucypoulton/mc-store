import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './styles/index.scss';
import {QueryClient, QueryClientProvider} from "react-query";
import {getConfig} from "./utils/apiMethods";

export const queryClient = new QueryClient()

queryClient.fetchQuery('config', getConfig)
	.then(() =>
		ReactDOM.render(
			<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<App/>
					</BrowserRouter>
				</QueryClientProvider>
			</React.StrictMode>,
			document.getElementById('root')
		))