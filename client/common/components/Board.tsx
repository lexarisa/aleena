import React, { cloneElement, useEffect, useState } from 'react';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';
import FilterComponent from './Filter';
import { formatData } from '../../pages/project/[token]';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import {
  deleteTask,
  updateTasks,
  createTask,
} from '../store/slices/task/task.slices';
import { useRouter } from 'next/router';
import { setCurrentMilestone } from '../store/slices/milestone/milestone.slice';
import Filter from './Filter';

const Board = () => {
  const dispatch = useAppDispatch();
  const reduxAllTasks = useAppSelector((state) => state.task.allTasks);
  const reduxFilterTask = useAppSelector((state) => state.task.allFilterTasks)
  const reduxMile = useAppSelector((state) => state.milestone.allMilestones);
  const reduxCurrentMile = useAppSelector(
    (state) => state.milestone.currentMilestone
  );
  const reduxCurrentProject = useAppSelector(
    (state) => state.project.currentProject
  );
  const reduxAllProjects = useAppSelector((state) => state.project.allProjects);
  const reduxUser = useAppSelector((state) => state.user.id);
  const pagination = 0;

  let tasksToDisplay: any;

  if (reduxFilterTask && reduxFilterTask.length > 0) {
    tasksToDisplay = reduxFilterTask;
  } else {
    tasksToDisplay = reduxAllTasks
  }

  const router = useRouter();

  useEffect(() => {
    // sse
    streamTask();
  });

  useEffect(() => {
    tasksToDisplay = reduxAllTasks
    // fetchAllTasksBoard();
   
  }, []);

  const fetchAllTasksBoard = async () => {
    const res = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/dashboard/${reduxCurrentProject.id}/${reduxUser}/${pagination}`
    );

    const data = await res.json();

    const allPipeTasks: any = []; // ARRAY OF ARRAYS OF TASKS SEPARATED BY SECTION !
    data.forEach((el: any) => {
      el.forEach((pj: any) => {
        pj.project.milestones.forEach((mile: any) => {
          allPipeTasks.push(mile.tasks);
        });
      });
    });

    const allTasks = allPipeTasks.flat(); // ALL TASKS IN ONE ARRAY

    console.log('all tasks', allTasks);
  };

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

  // TODO MAKE A IF STATEMENT TO CHECK IF YOU WANT THE DATA FROM THE MILESTONE OR FOR ALL !!!

    return (
      <>
        <Filter />
  
        <div className={styles.scrollContainer}>
          {/* <FilterComponent 
        milestones={milestones} 
        tags={tags} /> */}
  
          {sections.map((section, index) => {
            let filteredTasks: ITask[] = tasksToDisplay.length
              ? tasksToDisplay.filter((task: ITask) => {
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
