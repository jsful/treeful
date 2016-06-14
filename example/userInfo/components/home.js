import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

import './index.scss';

class Input extends Component {

	constructor() {
		super();
		this.state = {
			username: Treeful.getData('username'),
			loggedin: Treeful.getData('login')
		};

	}

	updateUsername() {
		let name = this.refs.username.value;
		Treeful.setData('username', name);
	}

	toggleLogin() {
		Treeful.setData('login', !this.state.loggedin);
		this.setState({
			loggedin: !this.state.loggedin
		});
	}



	render() {

		return (
			<div className='section'>
				<h1>USER MANAGEMENT</h1>

				<p>Username: </p> <input type='text' ref='username' defaultValue={this.state.username}  />
				<button onClick={this.updateUsername.bind(this)}>UPDATE</button>

				<br/>

				<button onClick={this.toggleLogin.bind(this)}>{this.state.loggedin ? "Logout" : "Login"}</button>

			</div>

		);

	}

} 


class Profile extends Component {
	constructor() {
		super();
		Treeful.subscribe('user', this.userChanged.bind(this));
		this.state = {
			username: Treeful.getData('username'),
			loggedin: Treeful.getData('login')
		};

	}

	userChanged(data, node) {
		switch(node) {
			case 'login':
				this.setState({
					loggedin: data
				});
				break;
			case 'username':
				this.setState({
					username: data
				});
				break;
		}

	}

	render() {
		return (
			<div className='section'>
				<h1>User Profile</h1>
				<p>Username: <b>{this.state.username}</b></p>  <br/>	
				<p>{this.state.loggedin ? "Logged in" : "Not Logged In"}</p>
			</div>
		);
	}
}

class Warning extends Component {
	constructor() {
		super();
		this.unsub = Treeful.subscribe('login', this.loginChanged.bind(this));
		this.state = {
			loggedin: Treeful.getData('login')
		};

	}

	loginChanged(data) {
		this.unsub();
		this.setState({
			loggedin: data
		});

	}

	render() {
		return (
			<div className={this.state.loggedin ? 'warning hide' : 'warning'}>
				<p>User is logged out!</p>
			</div>
		);
	}
}



export {Input, Profile, Warning};
