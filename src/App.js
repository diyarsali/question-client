import Login from './components/register/Login';
import Signup from './components/register/Signup';
import Main from './components/Home/Main';
import Home from './components/Home/homeRoute';
import Answer from './components/aswerQuestions/Answer';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/t/:id" component={Main} exact />
				<Route path="/signup" component={Signup} exact />
				<Route path="/Login" component={Login} exact />
				<Route path="/an/:id" component={Answer} exact />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
