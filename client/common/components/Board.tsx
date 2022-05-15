import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';
import FilterComponent from './Filter';
import { useAppDispatch, useAppSelector } from './../../store/hooks/redux-hooks';
import { fetchTasks } from '../../store/slices/Tasks/tasks.api';


const Board = ({ data, id }: any) => {


  const dispatch = useAppDispatch();

  const allTasks =  useAppSelector(state => state.task.allTasks)

  useEffect(() => {
    // sse
    streamTask();
    console.log(id)
    // @ts-ignore
    dispatch(fetchTasks(id.id))
  });

  const [sseTask, setSseTask] = useState(data);

  const streamTask = () => {
    const task = new EventSource('http://localhost:3001/tasks/sse');

    task.addEventListener('message', (tsk) => {
      const newTask = JSON.parse(tsk.data);

      setSseTask((tasks: any) => {
        const old = tasks.filter((oldtask: any) => oldtask.id !== newTask.id);

        return [...old, newTask];
      });
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
        let filteredTasks: ITask[] = allTasks
          ? allTasks.filter((task: ITask) => {
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
