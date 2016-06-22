import React, { Component } from 'react';
import Treeful from '../../../src/treeful-dev';

export default class CounterControl extends Component {
	increment() {
		Treeful.setData('count', Treeful.getData('count') + 1);
		// Or you may use a helper function
		// Treeful.incrementData('count');
	}

	decrement() {
		Treeful.setData('count', Treeful.getData('count') - 1);
		// Or you may use a helper function
		// Treeful.decrementData('count');
	}

	render() {
		return (
			<div>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		);
	}
}