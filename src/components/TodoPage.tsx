import React from 'react';
import { Todo, Status } from '../types';
import TodoList from './TodoList';

interface TodoPageProps {
  todos: Todo[];
  onAdd: () => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onSearchChange: (text: string) => void;
}

const groupStatuses: Status[] = ["Pending", "In Progress", "Completed"];

const TodoPage: React.FC<TodoPageProps> = ({
  todos,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="todo-page">
      <header className="header-bar">
        <h2 className='head-text-color'>TODO APP</h2>
      </header>
     
      {groupStatuses.map(status => {
        const todosForStatus = todos.filter(t => t.status === status);
        return (
          <TodoList
            key={status}
            status={status}
            todos={todosForStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
       <div className="toolbar">
        <button className="add-button" onClick={onAdd}>+</button>
      </div>
    </div>
  );
};

export default TodoPage;
