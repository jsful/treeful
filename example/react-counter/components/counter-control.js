import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class CounterControl extends Component {
	increment() {
		Treeful.setData('counter', Treeful.getData('counter') + 1);
	}

	decrement() {
		Treeful.setData('counter', Treeful.getData('counter') - 1);
	}

	render() {
		return (
			<div>
				<button onClick={this.increment.bind(this)}>Increment</button>
				<button onClick={this.decrement.bind(this)}>Decrement</button>
			</div>
		);
	}
}