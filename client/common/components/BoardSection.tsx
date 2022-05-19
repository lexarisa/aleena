import React, { useEffect, useState } from 'react';
import ITask from '../types/ITask';
import Card from './Card';
import Task from './Task';
import CustomButton from './small/CustomButton';
import { createNewTask } from '../../pages/api/taskApi';
import styles from '../../styles/BoardSection.module.css';
import { useRouter } from 'next/router';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setCurrentTask } from '../store/slices/task/task.slices';
import Filter from './Filter';

interface BoardInterface {
  columnTitle: String;
  tasks: ITask[];
}

const emptyTask = {} as ITask;

const BoardSection = ({ columnTitle, tasks }: BoardInterface) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.id);
  const selectedTask = useAppSelector((state) => state.task.currentTask);

  const [showTask, setShowTask] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const router = useRouter();

  const taskProps = {
    showTask: showTask, // bool
    setShowTask: setShowTask,
  };

  const handleClick = (task: ITask) => {
    setShowTask(!showTask);
    dispatch(setCurrentTask(task));
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
    setShowButton(false);
  };

  const handleCreateTask = async () => {
    if (taskTitle === '') {
      return;
    } else {
      const newTask: ITask = {
        title: taskTitle,
        user_id: Number(user),
        project_id: Number(router.query.project_id),
        priority: 'none',
        milestone_id: Number(router.query.id),
        status: columnTitle,
      };

      await createNewTask(newTask).catch((error) => console.log(error));
      setTaskTitle('');
      setShowInput(false);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTask();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className={styles.boardTitle}>{columnTitle}</h2>
        </div>

        <div>
          {tasks.map((task: ITask, index) => {
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
          style={
            showInput
              ? {
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                }
              : { borderRadius: '10px' }
          }
          className={styles.button}
        >
          {showInput ? <IoIosClose /> : <IoIosAdd />}
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
            onKeyDown={handleKeyDown}
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
