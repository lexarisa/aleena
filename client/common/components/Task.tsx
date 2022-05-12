import React, { Dispatch, SetStateAction } from 'react';
//styling
import styles from '../../styles/Task.module.css';

// interfaces
import ITask from '../types/ITask';

interface taskProps {
  setShowTask: Dispatch<SetStateAction<boolean>>;
  setCurrentTask: Dispatch<SetStateAction<ITask>>;
  task: ITask;
}

const Task: React.FC<taskProps> = ({ setShowTask, task }) => {
  // const source = new EventSource('http://localhost:3001/updateTasks');
  // source.addEventListener('message', (message) => {
  //   console.log('Data from server:', message);
  // });

  const handleClick = () => {
    setShowTask(false);
  };

  //TODO make reusable button
  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <button onClick={handleClick} className={styles.button}>
          x
        </button>

        <div className={styles.headerSection}>
          <h1>{task.title}</h1>
          <div>
            <p>status</p>
          </div>
          <div>{task.users}</div>
        </div>
        <div>{task.description}</div>
        <div>{task.comments}</div>
      </div>
    </div>
  );
};

export default Task;
