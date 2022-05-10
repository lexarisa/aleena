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
  const handleClick = () => {
    setShowTask(false);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <div>
          <h1>{task.title}</h1>
          <div>{task.users}</div>
        </div>
        <div>{task.description}</div>
        <div>{task.comments}</div>

        <button onClick={handleClick}>x</button>
      </div>
    </div>
  );
};

export default Task;
