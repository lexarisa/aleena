import React from 'react';
import styles from '../../styles/Comment.module.css';
import Image from 'next/image';

const Comment = ({ user, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={user.user.profile_pic}
          width={30}
          height={30}
          alt="User profile image"
        />
      </div>
      <p className={styles.username}>{user.user.username}</p>
      <p className={styles.comment}>{description}</p>
    </div>
  );
};

export default Comment;
