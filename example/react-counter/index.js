import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CounterControl from './components/counter-control';
import Counter from './components/counter';
import Treeful from '../../src/treeful-dev';

class App extends Component {
	constructor () {
		super();
		Treeful.addNode('count', 0);
	}

	render() {
		return (
			<div className='react'>
				<CounterControl />
				<br />
				<Counter />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));