import React, { Component } from 'react';
import Counter from './counter';

export default class Home extends Component {
	render() {
		return (
			<div className='home'>
				<h1>React</h1>
				<Counter />
			</div>
		);
	}
}