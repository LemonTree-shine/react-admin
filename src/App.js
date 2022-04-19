import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense,useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Routes,
	Route,
	Link,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Timo from "all-view";
import 'antd/dist/antd.css';
import './style/global.scss';


import store from "./reduce/redurcer";

import BaseAdmin from "@/components/adminBase/index";


const Test = lazy(() => import('./page/test'));
const Info = lazy(() => import('./page/info'));

const history = createBrowserHistory();
const TimoProvider = Timo.createTimo(store.data, store.redurce);
console.log(store);

function App() {
	return (
		<div className="App">
			<TimoProvider>
				<Router history={history}>
					<BaseAdmin>
						<Suspense fallback={<div>Loading...</div>}>
							<Routes>
								<Route path="/a" element={<Test />} />
								<Route path="/info" element={<Info />} />
								<Route path="*" element={<div>404</div>} />
							</Routes>
						</Suspense>
					</BaseAdmin>
				</Router>
			</TimoProvider>
		</div>
	);
}

export default App;
