import React from 'react';
import ITask from '../types/ITask';
import Card from './Card';
import Task from './Task';
import CustomButton from './small/MainBtn';
import styles from '../../styles/BoardSection.module.css';

interface BoardInterface {
  title: String;
  tasks: ITask[];
}

const emptyTask = {} as ITask;
const BoardSection: React.FC<BoardInterface> = (props) => {
  const [showTask, setShowTask] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState<ITask>(emptyTask);

  const taskProps = {
    showTask: showTask, // bool
    task: currentTask,
    setCurrentTask: setCurrentTask,
    setShowTask: setShowTask,
  };

  const handleClick = (task: ITask) => {
    console.log(task.title);
    setShowTask(!showTask);
    setCurrentTask(task);
  };

  const onClick = () => {
    console.log('hi');
  };
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.boardTitle}>{props.title}</h2>
      </div>
      <CustomButton button="+ add" onClick={onClick} />

      <div>
        {props.tasks.map((task: ITask, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(task)}
              className={styles.taskCard}
            >
              <Card {...task} />
            </div>
          );
        })}
      </div>
      {showTask && <Task {...taskProps} />}
    </div>
  );
};

export default BoardSection;
