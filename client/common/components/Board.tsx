import React, { useEffect, useState } from 'react';
import BoardSection from './BoardSection';
import ITask from '../types/ITask';
import styles from '../../styles/Board.module.css';
import tasks from '../../mockTasks';


const Board = ({ data }: any) => {

  useEffect(() => {
     // sse
    streamTask();
  });

  const [ sseTask, setSseTask ] = useState(data[0].tasks)

  const streamTask = () => {
    const task = new EventSource('http://localhost:3001/tasks/sse');

    task.addEventListener('message', (tsk) => {
      const newTask = JSON.parse(tsk.data);
   

      setSseTask((tasks: any) => {
        const old = tasks.filter((oldtask: any) => oldtask.id !== newTask.id)
    
        return [...old, newTask];
      })
      task.close();
    });
  }

  const sections: String[] = [
    'To Do',
    'In Progress',
    'Review',
    'Done',
    'Backlog',
  ];
  return (
    <div className={styles.scrollContainer}>
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
