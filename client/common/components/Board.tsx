import React, { useEffect, useState } from 'react';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';
import FilterComponent from './Filter';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import {
  deleteTask,
  updateTasks,
  createTask,
} from '../store/slices/task/task.slices';
import { useRouter } from 'next/router';
import { setCurrentMilestone } from '../store/slices/milestone/milestone.slice';

const Board = () => {
  const dispatch = useAppDispatch();
  const reduxAllTasks = useAppSelector((state) => state.task.allTasks);
  const reduxMile = useAppSelector((state) => state.milestone.allMilestones);
  const reduxCurrentMile = useAppSelector(
    (state) => state.milestone.currentMilestone
  );

  console.log('q', reduxAllTasks);

  const reduxAllProjects = useAppSelector((state) => state.project.allProjects);
  console.log('LEVELS DOWN ', reduxAllProjects);
  const router = useRouter();

  useEffect(() => {
    // sse
    streamTask();
  });

  const streamTask = () => {
    const sseTask = new EventSource(
      'https://ae99-45-130-134-153.eu.ngrok.io/tasks/sse'
    );

    sseTask.addEventListener('message', (tsk: any) => {
      const event = JSON.parse(tsk.data).event;
      const task = JSON.parse(tsk.data).data;

      if (event === 'create') {
        console.log('ok then ..', task);
        dispatch(updateTasks(task));
      }

      if (event === 'delete') {
        dispatch(deleteTask(task));
      }

      if (event === 'update') {
        dispatch(updateTasks(task));
      }

      sseTask.close();
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
    <>
      <div className={styles.scrollContainer}>
        {/* <FilterComponent 
      milestones={milestones} 
      tags={tags} /> */}

        {sections.map((section, index) => {
          let filteredTasks: ITask[] = reduxAllTasks.length
            ? reduxAllTasks.filter((task: ITask) => {
                console.log(task);
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
    </>
  );
};

export default Board;
