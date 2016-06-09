import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';


import Home from './components/home/home';


class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className='section mobile'>
				{this.props.children}
			</div>
		);
	}
};

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
	    <Route path='/' component={App}>
	      <IndexRoute component={Home} />
	    </Route>
	  </Router>
  </Provider>
), document.getElementById('app'));