import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducers';
import './index.css';
import App from './components/App';
const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore);
ReactDOM.render(
	<React.StrictMode>
		<Provider
			store={createStoreWithMiddleware(
				Reducer,
				window.__REDUX_DEVTOOLS_EXTENSION__ &&
					window.__REDUX_DEVTOOLS_EXTENSION__()
			)}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
