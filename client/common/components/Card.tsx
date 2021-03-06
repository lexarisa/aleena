import React from 'react';
import Tag from './small/Tag';
import styles from '../../styles/Card.module.css';
import ITask from '../types/ITask';
import Image from 'next/image';

interface ITaskProps {
  title: String;
  tags: String[];
  deadline: String;
  user?: String[];
}

function Card({ title, tags, deadline, user }: ITaskProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {tags ? (
        tags.map((tag) => {
          return <Tag label={tag.label} />;
        })
      ) : (
        <Tag label="Work" />
      )}

      <p>{deadline}</p>
      {/* <p>{description}</p> */}
      {/* <p>{tags[0]}</p>
      <p>{task.priority}</p> */}
      {user
        ? user.map((u) => {
            return (
              <div className={styles.avatar}>
                <Image
                  src={u.profile_pic}
                  width={50}
                  height={30}
                  alt="User profile image"
                />
              </div>
            );
          })
        : null}

      {/* profile pic of users, priority */}
    </div>
  );
}

export default Card;
