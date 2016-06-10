import './home.scss';

import React, { Component } from 'react';

import { Treeful } from '../../treeful/treeful';

class Home extends Component {
	constructor() {
		super(); 
		this.treeful = new Treeful();
	}

	componentDidMount() {

		this.treeful.subscribe('parent', this.cb.bind(this));

	}

	go () {
		this.treeful.getTree();
		this.treeful.setData('child', 'TEST');

	}

	cb(value, id) {
	
		alert(`data: ${value} || id: ${id}`);

	}

	render() {
		return (
			<div className='content home'>
				<h1>HOME</h1>

				<button onClick={this.go.bind(this)}>Simulate Callbacks</button>

				<ComponentTwo />
			</div>
		);
	}
}

class ComponentTwo extends Component {

	constructor() {
		super();
		this.treeful = new Treeful();

		console.log(this.treeful);
	}

	componentDidMount() {
		this.treeful.subscribe('uncle', this.uncleCallback.bind(this));
	}

	uncleCallback() {

		alert('UNCLE CALLBACK');

	}

	render() {

		return (

			<div></div>
		
		);

	}

}

export default Home;