import React, { useState } from 'react';
import ITask from '../types/ITask';
import Card from './Card';
import Task from './Task';
import CustomButton from './small/CustomButton';
import { createNewTask } from '../../pages/api/taskApi';
import { INewTask } from '../types/INewTask';
import styles from '../../styles/BoardSection.module.css';

interface BoardInterface {
  title: String;
  tasks: ITask[];
}

const emptyTask = {} as ITask;
const BoardSection: React.FC<BoardInterface> = (props) => {
  const [showTask, setShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask>(emptyTask);
  const [showButton, setShowButton] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const taskProps = {
    showTask: showTask, // bool
    task: currentTask,
    setCurrentTask: setCurrentTask,
    setShowTask: setShowTask,
  };

  const handleClick = (task: ITask) => {
    setShowTask(!showTask);
    setCurrentTask(task);
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
    setShowButton(false);
  };

  const handleCreateTask = async () => {
    const newTask: INewTask = {
      title: taskTitle,
      user_id: 1,
      project_id: 1,
      milestone_id: 1,
    };
    await createNewTask(newTask);
    setTaskTitle('');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  console.log(taskTitle);
  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className={styles.boardTitle}>{props.title}</h2>
        </div>
        {/* <CustomButton button="+ add" onClick={() => onClick()} /> */}

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
        <button
          onClick={() => handleShowInput()}
          // style={showButton ? { display: 'flex' } : { display: 'none' }}
          className={styles.button}
        >
          + add
        </button>
        <div
          className={styles.createTask}
          style={showInput ? { display: 'flex' } : { display: 'none' }}
        >
          <input
            type="text"
            name="task"
            id="task"
            onChange={handleChange}
            value={taskTitle}
            placeholder="Add new task"
            className={styles.input}
          />
          <button className={styles.addButton} onClick={handleCreateTask}>
            Add
          </button>
        </div>
        {showTask && <Task {...taskProps} />}
      </div>
    </>
  );
};

export default BoardSection;
