import React, { useState } from 'react';
import { Todo } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  const statusColor = {
    "Pending": "#FFA500",
    "In Progress": "#007bff", 
    "Completed": "green",
  }[todo.status];

  return (
    <li
      className={`todo-item ${todo.status === "Completed" ? "completed" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="item‐left" onClick={() => onEdit(todo)}>
        <div className="status‐dot" style={{ backgroundColor: statusColor }} />
        <div className="item‐content">
          <div className="title">{todo.title}</div>
          <div className="description">{todo.description}</div>
        </div>
      </div>

      
        <div className="item‐actions">
          <button onClick={() => onEdit(todo)}><FontAwesomeIcon icon={faEdit} color='#0052cc' /></button>
          
          <button onClick={() => onDelete(todo.id)}><FontAwesomeIcon icon={faTrash} color='red' /></button>
        </div>
    
    </li>
  );
}

export default TodoItem;
