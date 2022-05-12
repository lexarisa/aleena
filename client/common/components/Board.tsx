import React from 'react';

//components
import BoardSection from './BoardSection';
//interfaces
import ITask from '../types/ITask';

//styling
import styles from '../../styles/Board.module.css';

//mock tasks
import tasks from '../../mockTasks';

// interface BoardProps {
//   data: ;
// }

const Board = ({ data }: BoardProps) => {
  console.log(data);

  // fetch all the tasks

  //call the API
  //if error -> return <p>error</p>
  //if loading -> return <p>loading...</p>
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
          ? data[0].tasks.filter((task: ITask) => {
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
};

export default Board;
