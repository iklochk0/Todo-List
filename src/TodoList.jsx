import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { text: todoText, completed: false };
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, { text: todoText, completed: false }]);
      }
      setTodoText('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setTodoText(todos[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleShowAll = () => {
    setShowCompleted(false);
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const filteredTodos = showCompleted ? todos.filter((todo) => todo.completed) : todos;

  const year = new Date().getFullYear();

  return (
    <>
      <span style={{position:'absolute', bottom: 10 + 'px', fontSize: 12 + 'px'}}>Для того щоб поставити статус виконанно, просто натисніть на заголовок завдання. ToDo List&copy; {year}</span>
      <div className="todo-list">
        <div>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add Todo..."
          />
          <button onClick={handleAddTodo}>{editIndex !== null ? 'Update' : 'Add'}</button>
        </div>
        <div>
          <button onClick={handleShowAll}>Show All</button>
          <button onClick={handleShowCompleted}>Show Completed</button>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => handleToggleComplete(index)}>{todo.text}</span>
              {todo.completed && <span className="completed-text">Completed</span>}
              {!todo.completed && (
                <>
                  <button onClick={() => handleEditTodo(index)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;