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
import 'antd/dist/antd.css';
import './style/global.scss';

import BaseAdmin from "@/components/adminBase/index";
import routeConfig from "@/route/config";
import EmptyPage from '@/page/404';
const history = createBrowserHistory();

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<BaseAdmin>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							{routeConfig.map((item)=>{
								return <Route path={item.path} key={item.path} element={<item.component/>} />
							})}

							<Route path="*" element={<EmptyPage/>} />

						</Routes>
					</Suspense>
				</BaseAdmin>
			</Router>
		</div>
	);
}

export default App;
