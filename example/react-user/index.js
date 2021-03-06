import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import Treeful from '../../src/treeful';
import UserInput from './components/user-input';
import Profile from './components/profile';
import Warning from './components/warning';

class App extends Component {
	constructor () {
		super();
		Treeful.dev();
		Treeful.add('user')
			.add('username', 'lbittner', 'user')
			.add('login', false, 'user');
	}

	render() {
		return (
			<div className='react'>
				<UserInput />
				<Profile />
				<Warning />
				<img src="./tree.png" alt="" />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));