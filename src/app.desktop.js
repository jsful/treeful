import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';

import Home from './components/home/home';
import {Treeful, TreefulNode} from './treeful/treeful';


class App extends Component {
	constructor() {
		super();

		let node = new TreefulNode('grandparent');
		this.treeful = new Treeful();

		this.treeful.addParentNode(node);

		this.treeful.addChildNode('grandparent', new TreefulNode('parent'));
		this.treeful.addChildNode('grandparent', new TreefulNode('uncle'));
		this.treeful.addChildNode('parent', new TreefulNode('child'));
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
	    </Route>
	  </Router>
), document.getElementById('app'));