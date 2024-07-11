import React, { useState, useEffect } from 'react';

function TaskForm({ currentTask, onSave, onCancel }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: ''
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save Task</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default TaskForm;
