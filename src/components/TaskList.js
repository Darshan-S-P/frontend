// TaskList.js

import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status} - {task.due_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
