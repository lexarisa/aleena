import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';
import FilterComponent from './Filter';
import { useAppDispatch } from '../../store/index.store';
import { sseTasks } from '../../store/slices/Tasks/tasks.api';


const Board = ({ data }: any) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
     // sse
    dispatch(sseTasks());
  });

  const [ sseTask, setSseTask ] = useState()


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
          ? sseTask.filter((task: ITask) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { id } = context.query;

  const res = await fetch(`http://localhost:3001/milestone/${id}`); //need milestone id

  const data = await res.json();

  return { props: { data, id: context.query }, notFound: false };
};