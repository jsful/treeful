import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			username: Treeful.get('username'),
			isLoggedIn: Treeful.get('login')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('user', this.userChanged.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	userChanged(data, node) {
		switch(node) {
			case 'login':
				this.setState({ isLoggedIn: data });
				break;
			case 'username':
				this.setState({ username: data });
				break;
		}
	}

	render() {
		return (
			<div className='section'>
				<h2>User Profile</h2>
				<p>Username: <b>{this.state.username}</b></p>
				<br />	
				<p>{this.state.isLoggedIn ? 'Logged in' : 'Not Logged In'}</p>
			</div>
		);
	}
}