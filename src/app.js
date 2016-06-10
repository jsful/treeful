import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './components/home/home';
import Vis from './components/vis/vis';
import Treeful from './treeful/treeful';

class App extends Component {
	constructor() {
		super();

		this.treeful = new Treeful();

		this.treeful.addNode('dad')
		.addNode('boy', 52)
		.addNode('toy', { count: 1, isTrue: false }, 'boy');
		console.log(this.treeful.getTree());
	}

	render() {
		return (
			<div className='section desktop'>
				{this.props.children}
			</div>
		);
	}
};

ReactDOM.render((
	<Router history={browserHistory}>
	    <Route path='/' component={App}>
	      <IndexRoute component={Home} />
	      <Route path='vis' component={Vis} />
	    </Route>
	  </Router>
), document.getElementById('app'));