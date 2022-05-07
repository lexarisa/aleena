import React from 'react';
import Task from '../types/Task';
import Card from './Card';

interface BoardInterface {
  title: String;
  tasks: Task[];
}

const BoardSection: React.FC<BoardInterface> = (props) => {
  return (
    <div>
      <div>
        <h3>{props.title}</h3>
      </div>
      <div>
        {props.tasks.map((task: Task, index) => {
          return (
            <div key={index}>
              <Card {...task} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardSection;
