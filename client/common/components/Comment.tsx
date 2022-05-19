import React from 'react';
import styles from '../../styles/Comment.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';

const Comment = ({ comment }: any) => {
  console.log('comment in compo', comment);
  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <div className={styles.avatar}>
          <Image
            src={comment.user.profile_pic}
            width={40}
            height={40}
            alt="User profile image"
            layout="intrinsic"
          />
        </div>
      </div>
      <div className={styles.commentSection}>
        <p className={styles.username}>{comment.user.username}</p>
        <p className={styles.date}>
          {dayjs(comment.created_at).format(`HH:mm A: - MMM D, YYYY`)}
        </p>
        <p className={styles.comment}>{comment.description}</p>
      </div>
    </div>
  );
};

export default Comment;
