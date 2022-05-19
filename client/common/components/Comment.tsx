import React from 'react';
import styles from '../../styles/Comment.module.css';
import Image from 'next/image';

const Comment = ({ description }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <div className={styles.avatar}>
          <Image
            src="https://github.com/thaiscosta.png"
            width={40}
            height={40}
            alt="User profile image"
            layout="intrinsic"
          />
        </div>
      </div>
      <div className={styles.commentSection}>
        {/* <p className={styles.username}>{user}</p> */}
        <p className={styles.comment}>{description}</p>
      </div>
    </div>
  );
};

export default Comment;
