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

  const reduxAllProjects = useAppSelector((state) => state.project.allProjects);

  const router = useRouter();
  let reduxTasks = [];
  const inMilestone = router.query.milestone_id;
  console.log('inMilestone', inMilestone);
  inMilestone
    ? (reduxTasks = useAppSelector((state) => state.task.allTasksMilestone))
    : (reduxTasks = useAppSelector((state) => state.task.allTasks));
  console.log('redux tasks', reduxTasks);
  console.log(
    'all tasks',
    useAppSelector((state) => state.task.allTasks)
  ),
    console.log(
      'milestone tasks',
      useAppSelector((state) => state.task.allTasksMilestone)
    );
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
        // @ts-ignore
        if (task.milestone_id === reduxCurrentMile.id) {
          console.log('hiiiit sse task');
          dispatch(updateTasks(task));
          //!how are we filtering
        }
      }

      if (event === 'delete') {
        // @ts-ignore
        if (task.milestone_id === reduxCurrentMile.id) {
          console.log('hiiiit sse task');
          dispatch(deleteTask(task));
        }
      }

      if (event === 'update') {
        console.log('AND NOOOOOW ..', task);
        // @ts-ignore
        if (task.milestone_id === reduxCurrentMile.id) {
          dispatch(updateTasks(task));
        }
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
          let filteredTasks: ITask[] = reduxTasks.length
            ? reduxTasks.filter((task: ITask) => {
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
