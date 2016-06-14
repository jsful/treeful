import React, { Component } from 'react';
import Treeful from '../../../src/treeful-dev';

export default class Warning extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: Treeful.getData('login')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('login', this.loginChanged.bind(this));
	}

	componentWillUmount() {
		this.unsubscribe();
	}

	loginChanged(isLoggedIn) {
		this.setState({ isLoggedIn });
	}

	render() {
		return (
			<div className={this.state.isLoggedIn ? 'warning hide' : 'warning'}>
				<p>User is logged out!</p>
			</div>
		);
	}
}
