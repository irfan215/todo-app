import React, { useState } from 'react';
import { Todo, Status } from '../types';
import TodoItem from './TodoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface TodoListProps {
  status: Status;
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ status, todos, onEdit, onDelete }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="todo-group">
      <div className="group-header" onClick={() => setCollapsed(prev => !prev)}>
        <h3>{status} ({todos.length})</h3>
        <span>{collapsed ? 
           <FontAwesomeIcon
           icon={faChevronDown}
           className={`transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
         /> :    <FontAwesomeIcon
         icon={faChevronUp}
         className={`transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
       />}</span>
      </div>
      {!collapsed && (
        <ul className="todo‐items">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
