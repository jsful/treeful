import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class UserInput extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: Treeful.get('login')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('login', this.updateLogin.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	updateUsername() {
		Treeful.set('username', this.refs.username.value);
	}

	toggleLogin() {
		Treeful.set('login', !Treeful.get('login'));
		// Or you may use a helper function
		// Treeful.toggle('login');
	}

	updateLogin(isLoggedIn) {
		this.setState({ isLoggedIn });
	}

	render() {
		return (
			<div className='section'>
				<h2>User Input</h2>
				<p>Username: </p> <input type='text' ref='username' defaultValue={Treeful.get('username')}  />
				<button onClick={this.updateUsername.bind(this)}>UPDATE</button>
				<br />
				<button onClick={this.toggleLogin}>{this.state.isLoggedIn ? 'Logout' : 'Login'}</button>
			</div>
		);
	}
}