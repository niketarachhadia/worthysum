import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginError from './components/loginerror';
import Register from './components/register';
import AuthContainer from './components/authcontainer';
import Networth from './components/networth';
import Intro from './components/intro';
import {Provider} from 'react-redux';
import store from './store';
import { syncHistoryWithStore} from 'react-router-redux';
import { Router, Route, hashHistory,Redirect,IndexRedirect  } from 'react-router';

const history = syncHistoryWithStore(hashHistory, store)
var routes = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
			  <Route path="/loginerror" component={LoginError} />
			  <Route path="/register" component={Register} />
			  <Route path="/login" component={AuthContainer} />
			  <Route path="/home" component={Networth} />
			  <Route path="/intro" component={Intro} />
			  <IndexRedirect to="/intro" />
			</Route>
		  </Router>
	</Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
