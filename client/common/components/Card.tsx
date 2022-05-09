import React from 'react';
import ITask from '../types/ITask';

function Card(task: ITask) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.tags[0]}</p>
      <p>{task.priority}</p>
      {/* profile pic of users, priority */}
    </div>
  );
}

export default Card;
