import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Treeful from '../../src/treeful';

class App extends Component {
	render() {
		return (
			<div className='react'>
				<h1>React</h1>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));