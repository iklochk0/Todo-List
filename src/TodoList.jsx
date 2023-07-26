import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todoText;
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

  const handleCompleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-list">
      { editIndex !== null ? '' :
      <div>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add Todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      }
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={() => handleAddTodo()}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                <button onClick={() => handleCompleteTodo(index)}>
                  {todo.completed ? 'Uncomplete' : 'Complete'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;