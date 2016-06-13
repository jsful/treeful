import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CounterControls, Counter } from './components/home';
import Treeful from '../../src/treeful';

class App extends Component {

	constructor () {

		super();
		//ADD A COUNTER NODE TO THE ROOT
		Treeful.addNode('counter', 0);

	}


	render() {
		return (
			<div className='react'>
				<CounterControls />

				<br />

				<Counter />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));