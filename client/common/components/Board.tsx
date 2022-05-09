import React from 'react';
//components
import BoardSection from './BoardSection';
//interfaces
import ITask from '../types/ITask';

//styling
import styles from '../../styles/Board.module.css';

//mock tasks
import tasks from '../../mockTasks';

function Board() {
  //call the API
  //if error -> return <p>error</p>
  //if loading -> return <p>loading...</p>
  const sections: String[] = [
    'Backlog',
    'Todo',
    'In Progress',
    'Review',
    'Done',
  ];
  return (
    <div className={styles.scrollContainer}>
      {sections.map((section, index) => {
        let filteredTasks: ITask[] = tasks
          ? tasks.filter((task: ITask) => {
              return task.status === section;
            })
          : [];
        return (
          <div key={index} className={styles.taskColumn}>
            <BoardSection title={section} tasks={filteredTasks} />
          </div>
        );
      })}
    </div>
  );
}

export default Board;