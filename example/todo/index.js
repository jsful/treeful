import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from '../../src/treeful';

import './index.scss';

class App extends Component {

	constructor () {
		super();
		Treeful.addNode('todos', []);
		Treeful.subscribe('todos', this.updateTodos.bind(this));
		this.state = {
			todos: []
		};
	}


	updateTodos(data) {

		this.setState({
			todos: data
		});

	}

	renderCards() {
		let i = this.state.todos.map((item, index) => {
			return (
				(<Todo data={item} key={index}/>)
			) 
		})
		return i;
	}

	render() {
		return (
			<div className='react'>
				<ToDoController />
				<hr/>
				<div className='todos'>
					{
						this.renderCards()
					}
				</div>
			</div>
		);
	}
};

class ToDoController extends Component {

	constructor() {

		super();

	}

	addTodo() {

		let input = this.refs.input.value;
		let color = this.refs.color.value;

		let i = Treeful.getData('todos');
		i.push({name: input, color: color, id: i.length + 1})

		Treeful.setData('todos', i);

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

class Todo extends Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div style={{backgroundColor: this.props.data.color}} className='todo'>
				<p>{this.props.data.id} : {this.props.data.name}</p>
			</div>
		);

	}

}

ReactDOM.render(<App />, document.getElementById('app'));




