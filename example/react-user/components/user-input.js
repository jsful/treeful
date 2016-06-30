import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class UserInput extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: Treeful.getData('login')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('login', this.updateLogin.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	updateUsername() {
		Treeful.setData('username', this.refs.username.value);
	}

	toggleLogin() {
		Treeful.setData('login', !Treeful.getData('login'));
		// Or you may use a helper function
		// Treeful.toggleData('login');
	}

	updateLogin(isLoggedIn) {
		this.setState({ isLoggedIn });
	}

	render() {
		return (
			<div className='section'>
				<h2>User Input</h2>
				<p>Username: </p> <input type='text' ref='username' defaultValue={Treeful.getData('username')}  />
				<button onClick={this.updateUsername.bind(this)}>UPDATE</button>
				<br />
				<button onClick={this.toggleLogin}>{this.state.isLoggedIn ? 'Logout' : 'Login'}</button>
			</div>
		);
	}
}