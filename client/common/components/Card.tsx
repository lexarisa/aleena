import React from 'react';
import Tag from './small/Tag';
import styles from '../../styles/Card.module.css';

interface ITaskProps {
  title: string;
  description?: string;
}

function Card({ title, description }: ITaskProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {/* <h3 className={styles.description}>{description}</h3> */}
      <Tag />
      {/* <p>{description}</p> */}
      {/* <p>{tags[0]}</p>
      <p>{task.priority}</p> */}
      {/* profile pic of users, priority */}
    </div>
  );
}

export default Card;
