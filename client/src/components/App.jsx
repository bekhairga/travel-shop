import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import About from './about';
import Login from './register-login';

function App() {
	return (
		<div>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/about' component={About} exact />
				<Route path='/login' component={Login} exact />
			</Switch>
		</div>
	);
}

export default App;
