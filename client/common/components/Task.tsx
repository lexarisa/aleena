import React, { Dispatch, SetStateAction } from 'react';
//styling
import styles from '../../styles/Task.module.css';

// interfaces
import ITask from '../types/ITask';

//components
import Feed from './Feed';

interface taskProps {
  setShowTask: Dispatch<SetStateAction<boolean>>;
  setCurrentTask: Dispatch<SetStateAction<ITask>>;
  task: ITask;
}

const Task: React.FC<taskProps> = ({ setShowTask, task }) => {
  const handleClick = () => {
    // setShowTask(false);
    const source = new EventSource('http://localhost:3001/feed');

    source.addEventListener('message', (message) => {
      console.log('Data from server:', message);
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div>
          <h1>{task.title}</h1>
          <div>{task.users}</div>
        </div>
        <div>{task.description}</div>
        <div>{task.comments}</div>
        {/* <Feed /> */}

        <button onClick={handleClick}>x</button>
      </div>
    </div>
  );
};

export default Task;
