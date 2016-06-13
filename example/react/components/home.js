import React, { Component } from 'react';
import Treeful from '../../../src/treeful';


class CounterControls extends Component {

	constructor() {
		super();

	}

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


class Counter extends Component {
	constructor() {
		super();
		this.state = {
			count: Treeful.getData('counter')
		}

		Treeful.subscribe('counter', this.countUpdated.bind(this));

	}

	countUpdated(value) {
		this.setState({
			count: value
		});
	}

	render() {
		return (
			<div>
				{this.state.count}
			</div>
		);
	}
}

export {CounterControls, Counter};
