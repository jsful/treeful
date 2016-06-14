import React, { Component } from 'react';
import Treeful from '../../../src/treeful-dev';

export default class Counter extends Component {
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
		Treeful.print();
	}

	render() {
		return (
			<div>
				{this.state.count}
			</div>
		);
	}
}