import React, { Component } from 'react';
import Treeful from '../../../src/treeful';

export default class TodoController extends Component {
	addTodo() {
		const data = Treeful.getData('todos');

		data.push({ 
			name: this.refs.name.value,
			color: this.refs.color.value,
			id: data.length + 1
		});

		Treeful.setData('todos', data);

		// Or you may use a helper function

		// Treeful.pushData('todos', {
		// 	name: this.refs.name.value,
		// 	color: this.refs.color.value,
		// 	id: Treeful.getData('todos').length + 1
		// });
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