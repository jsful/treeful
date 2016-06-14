import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from '../../../src/treeful-dev';

export default class Todo extends Component {
	render() {
		return (
			<div style={{backgroundColor: this.props.data.color}} className='todo'>
				<p>{this.props.data.id} : {this.props.data.name}</p>
			</div>
		);
	}
}