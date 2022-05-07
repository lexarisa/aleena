import React from 'react';
//components
import BoardSection from './BoardSection';
//interfaces
import Task from '../types/Task';

function Board() {
  const tasks = [
    {
      id: 1,
      title: 'first task',
      description: 'simple description of task',
      status: 'Done',
      priority: 'Low',
      tags: ['testing'], //Tags[]
      deadline: '07-05-22',
      milestone_id: 'milestone2',
      comments: ['nice', 'wow'], // Comment[]
      github: ['hhhh', 'knn'], // Github[]
      created_at: 'today',
    },
    {
      id: 2,
      title: 'second task',
      description: 'simple description of task',
      status: 'Todo',
      priority: 'Low',
      tags: ['testing'], //Tags[]
      deadline: '07-05-22',
      milestone_id: 'milestone2',
      comments: ['nice', 'wow'], // Comment[]
      github: ['hhhh', 'knn'], // Github[]
      created_at: 'today',
    },
  ];
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
    <div>
      {sections.map((section, index) => {
        let filteredTasks: Task[] = tasks
          ? tasks.filter((task: Task) => {
              return task.status === section;
            })
          : [];
        return (
          <div key={index}>
            <BoardSection title={section} tasks={filteredTasks} />
            );
          </div>
        );
      })}
    </div>
  );
}

export default Board;
