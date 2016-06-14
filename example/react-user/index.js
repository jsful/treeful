import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Profile, Warning } from './components/home';
import Treeful from '../../src/treeful';

class App extends Component {

	constructor () {

		super();
		Treeful.addNode('user');
		Treeful.addNode('username', "lbittner", 'user');
		Treeful.addNode('login', false, 'user');

	}


	render() {
		return (
			<div className='react'>
				<Input />
				<Profile />
				<Warning />

				<img src="./tree.png" alt="" />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));