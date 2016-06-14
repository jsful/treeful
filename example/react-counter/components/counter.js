import React, { Component } from 'react';
import Treeful from '../../../src/treeful-dev';

export default class Counter extends Component {
	constructor() {
		super();
		this.state = {
			count: Treeful.getData('counter')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('counter', this.countUpdated.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	countUpdated(count) {
		this.setState({ count });
	}

	render() {
		return (
			<div>
				{this.state.count}
			</div>
		);
	}
}