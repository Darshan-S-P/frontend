// App.js

import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveTask = (task) => {
    const url = isEditing ? `http://127.0.0.1:5000/tasks/${task.id}` : 'http://127.0.0.1:5000/tasks';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setCurrentTask(null);
        setIsEditing(false);
        // Optionally, fetch updated task list or update state to reflect changes
      })
      .catch((error) => {
        console.error('Error saving task:', error);
      });
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleDeleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCurrentTask(null);
        // Optionally, fetch updated task list or update state to reflect changes
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleCancel = () => {
    setCurrentTask(null);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing || currentTask ? (
        <TaskForm currentTask={currentTask} onSave={handleSaveTask} onCancel={handleCancel} />
      ) : (
        <button onClick={() => setIsEditing(true)}>Add Task</button>
      )}
      <TaskList onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
