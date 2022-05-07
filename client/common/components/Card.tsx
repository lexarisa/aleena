import React from 'react';
import Task from '../types/Task';

function Card(task: Task) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.tags}</p>
    </div>
  );
}

export default Card;
