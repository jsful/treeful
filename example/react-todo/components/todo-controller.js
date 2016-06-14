import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from '../../../src/treeful';

export default class TodoController extends Component {
	addTodo() {
		const input = this.refs.input.value;
		const color = this.refs.color.value;
		const data = Treeful.getData('todos');
		data.push({name: input, color: color, id: data.length + 1});
		Treeful.setData('todos', data);
	}

	render() {
		return (
			<div>
				<input ref='input' placeholder="Name"></input>
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