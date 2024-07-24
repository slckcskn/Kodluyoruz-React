import React, { useState } from 'react'
import './style.css';

function ToDos() {
	const [todos, setTodos] = useState([
		{ id: 1, text: 'Learn JavaScript', completed: true },
		{ id: 2, text: 'Learn React', completed: false },
		{ id: 3, text: 'Have a life!', completed: false }
	]);
	const [input, setInput] = useState('');
	const [filter, setFilter] = useState('all');

	// To Do ekleme kısmı:
	const addTodo = (e) => {
		e.preventDefault();
		if (input.trim() !== '') {
			setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
			setInput('');
		}
	};

	//Belirli bir ID'ye sahip to-do'nun completed durumunu tersine çevirir:
	const toggleTodo = (id) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};

	//Belirli bir ID'ye sahip to-do hariç tüm to-do'ları yeni bir diziye filtreler:
	const removeTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	//todos.every(): Tüm to-do'ların tamamlanıp tamamlanmadığını kontrol eder,
	//setTodos(todos.map()): Tüm to-do'ların durumunu tersine çevirir:
	const toggleAll = () => {
		const areAllMarked = todos.every(todo => todo.completed);
		setTodos(todos.map(todo => ({ ...todo, completed: !areAllMarked })));
	};

	//Tamamlanmamış to-do'ları yeni bir diziye filtreler:
	const clearCompleted = () => {
		setTodos(todos.filter(todo => !todo.completed));
	};

	//filter state'ine bağlı olarak to-do'ları filtreler:
	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	//Tamamlanmamış to-do'ların sayısını hesaplar:
	const activeCount = todos.filter(todo => !todo.completed).length;

	return (

		<div className='main'>
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<form onSubmit={addTodo}>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						autoFocus
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</form>
			</header>

			<section className="main">
				<input
					id="toggle-all"
					className="toggle-all"
					type="checkbox"
					onChange={toggleAll}
					checked={todos.every(todo => todo.completed)}
				/>
				<label htmlFor="toggle-all">Mark all as complete</label>

				<ul className="todo-list">
					{filteredTodos.map(todo => (
						<li key={todo.id} className={todo.completed ? 'completed' : ''}>
							<div className="view">
								<input
									className="toggle"
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
								/>
								<label>{todo.text}</label>
								<button className="destroy" onClick={() => removeTodo(todo.id)}></button>
							</div>
						</li>
					))}
				</ul>
			</section>

			<footer className="footer">
				<span className="todo-count">
					<strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
				</span>

				<ul className="filters">
					<li>
						<a href="#/" className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All</a>
					</li>
					<li>
						<a href="#/active" className={filter === 'active' ? 'selected' : ''} onClick={() => setFilter('active')}>Active</a>
					</li>
					<li>
						<a href="#/completed" className={filter === 'completed' ? 'selected' : ''} onClick={() => setFilter('completed')}>Completed</a>
					</li>
				</ul>

				<button className="clear-completed" onClick={clearCompleted}>
					Clear completed
				</button>
			</footer>

		</section>

		<footer class="info">
				<p>Click to edit a todo</p>
				<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
				<p>Edited by <a href="https://github.com/slckcskn">Selçuk Coşkun</a></p>
				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
		</div>
	);

}

export default ToDos