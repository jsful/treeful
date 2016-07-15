import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class Counter extends Component {
	constructor() {
		super();
		this.state = {
			count: Treeful.get('count')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('count', this.countUpdated.bind(this));
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