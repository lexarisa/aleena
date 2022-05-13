import React from 'react';
import Tag from './small/Tag';
import styles from '../../styles/Card.module.css';
import ITask from '../types/ITask';

interface ITaskProps {
  title: String;
  tags: String;
}

function Card({ title, tags }: ITaskProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <Tag label="Work" />
      {/* <p>{description}</p> */}
      {/* <p>{tags[0]}</p>
      <p>{task.priority}</p> */}
      {/* profile pic of users, priority */}
    </div>
  );
}

export default Card;
