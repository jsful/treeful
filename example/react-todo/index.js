import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Treeful from '../../src/treeful-dev';

import './index.scss';
import TodoController from './components/todo-controller';
import Todo from './components/todo';

class App extends Component {
	constructor () {
		super();
		Treeful.addNode('todos', []);
		this.state = {
			todos: Treeful.getData('todos')
		};
	}

	componentDidMount() {
		this.unsubscribe = Treeful.subscribe('todos', this.updateTodos.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	updateTodos(todos) {
		this.setState({ todos });
	}

	render() {
		return (
			<div className='react'>
				<TodoController />
				<hr/>
				<div className='todos'>
					{ this.state.todos.map((item, index) => <Todo data={item} key={index}/>) }
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
