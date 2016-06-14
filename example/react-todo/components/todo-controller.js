import React, { Component } from 'react';
import Treeful from '../../../src/treeful-dev';

export default class TodoController extends Component {
	addTodo() {
		const data = Treeful.getData('todos');

		data.push({ 
			name: this.refs.name.value,
			color: this.refs.color.value,
			id: data.length + 1
		});

		Treeful.setData('todos', data);
	}

	render() {
		return (
			<div>
				<input ref='name' placeholder="Name"></input>
				<select ref='color'>
					<option value="red">Red</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
				</select>
				<button onClick={this.addTodo.bind(this)}>Add Todo</button>
			</div>
		);
	}
}