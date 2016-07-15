import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class CounterControl extends Component {
	increment() {
		Treeful.set('count', (e) => e + 1);
		// Or you may use a helper function
		// Treeful.increment('count');
	}

	decrement() {
		Treeful.set('count', (e) => e - 1);
		// Or you may use a helper function
		// Treeful.decrement('count');
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