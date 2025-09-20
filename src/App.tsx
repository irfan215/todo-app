import React, { useState } from 'react';
import "./styles.css";
import TodoPage from './components/TodoPage';
import AddEditTodoForm from './components/AddEditTodoForm';
import { Todo, Status } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchText, setSearchText] = useState('');

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...todo,
    };
    setTodos(prev => [...prev, newTodo]);
    setIsAdding(false);
  };

  const updateTodo = (updated: any) => {
    setTodos(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );
    setEditingTodo(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t =>
    t.title.toLowerCase().includes(searchText.toLowerCase())
    || t.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app-container">
      {isAdding ? (
        <AddEditTodoForm
          initialTodo={null}
          onCancel={() => setIsAdding(false)}
          onSubmit={addTodo}
        />
      ) : editingTodo ? (
        <AddEditTodoForm
          initialTodo={editingTodo}
          onCancel={() => setEditingTodo(null)}
          onSubmit={updateTodo}
        />
      ) : (
        <TodoPage
          todos={filteredTodos}
          onAdd={() => setIsAdding(true)}
          onEdit={(todo) => setEditingTodo(todo)}
          onDelete={deleteTodo}
          onSearchChange={setSearchText}
        />
      )}
    </div>
  );
};

export default App;
