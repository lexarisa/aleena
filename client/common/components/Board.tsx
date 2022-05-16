import React, { useEffect, useState } from 'react';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';
import FilterComponent from './Filter';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setTasks } from '../store/slices/task/task.slices';

const Board = () => {

  const dispatch = useAppDispatch();
  const reduxAllTasks = useAppSelector(state => state.task.allTasks);

  console.log(reduxAllTasks)

  useEffect(() => {
    // sse
    streamTask();
  });

  // const [sseTask, setSseTask] = useState([]);

  const streamTask = () => {
    const task = new EventSource('http://localhost:3001/tasks/sse');

    task.addEventListener('message', (tsk) => {
      const newTask = JSON.parse(tsk.data);
      
      const old = reduxAllTasks.filter((oldtask: any) => oldtask.id !== newTask.id);

      dispatch(setTasks([...old, newTask]))

      task.close();
    });
  };

  const sections: String[] = [
    'To Do',
    'In Progress',
    'Review',
    'Done',
    'Backlog',
  ];
  return (
    <div className={styles.scrollContainer}>
      {/* <FilterComponent 
      milestones={milestones} 
      tags={tags} /> */}

      {sections.map((section, index) => {
        let filteredTasks: ITask[] = tasks
          ? reduxAllTasks.filter((task: ITask) => {
              return task.status === section;
            })
          : [];
        return (
          <div key={index} className={styles.taskColumn}>
            <BoardSection columnTitle={section} tasks={filteredTasks} />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
