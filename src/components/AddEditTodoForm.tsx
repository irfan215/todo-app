import React, { useState } from 'react';
import { Todo, Status } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface FormProps {
  initialTodo: Todo | null;
  onSubmit: (todo: Omit<Todo, 'id'> | Todo) => void;
  onCancel: () => void;
}

const statusOptions: Status[] = ["Pending", "In Progress", "Completed"];

const AddEditTodoForm: React.FC<FormProps> = ({ initialTodo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [description, setDescription] = useState(initialTodo?.description || '');
  const [status, setStatus] = useState<Status>(initialTodo?.status || "Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    const todoData = initialTodo
      ? { ...initialTodo, title, description, status }
      : { title, description, status };

    onSubmit(todoData);
  };

  return (
    <div className="form-page">
      <header className="header-bar">
        <span onClick={onCancel}>
      <FontAwesomeIcon icon={faArrowLeft} size='2x' style={{paddingRight: '10px'}}/>
      </span>
        <h2 className='head-text-color'>{initialTodo ? "Edit Task" : "Add Task"}</h2>
      </header>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter the description"
          />
        </div>
        {initialTodo && (
          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Status)}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-buttons">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">{initialTodo ? "Update" : "ADD"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTodoForm;
