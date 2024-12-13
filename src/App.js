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
// import 'antd/dist/antd.css';
import './style/global.scss';
import Tucky from 'tucky';
// import Tucky from '@/npm/Puppy/index';

import BaseAdmin from "@/components/adminBase/index";
import routeConfig from "@/route/config";
import EmptyPage from '@/page/404';
const history = createBrowserHistory();

const initState = {
	userInfo:{
		name:'chenze',
		age:'16',
		email:"163.com"
	}
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'set_userinfo':
			state.userInfo = {
				...state.userInfo,
				...action.value
			}
			return {
				...state
			}
		case 'set_accountinfo':
			if(!state.accountInfo){
				state.accountInfo = action.value
			}else{
				state.accountInfo = {
					...state.accountInfo,
					...action.value
				}
			}
			return {
				...state
			}
		default:
			return state
	}
}

const TuckyStore=  Tucky.createTucky({
	initState,
	reducer,
	//name:'global-cms'
});



function App() {
	const value = TuckyStore.useTuckyReduce();

	return (
		<div className="App">
			<TuckyStore.Provider 
				value={value}
			>
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
			</TuckyStore.Provider>
		</div>
	);
}

export default App;
