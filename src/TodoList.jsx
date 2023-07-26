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
        setTodos([...todos, todoText]);
      }
      setTodoText('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setTodoText(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-list">
      <div>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add Todo..."
        />
        <button onClick={handleAddTodo}>{editIndex !== null ? 'Update' : 'Add'}</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                />
                <button onClick={() => handleAddTodo()}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;