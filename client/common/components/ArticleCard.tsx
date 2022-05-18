import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useAppSelector } from '../store/hooks/redux-hooks';

const ArticleCard = ({ data }: any) => {
  const userBookmarks = useAppSelector((state) => state.user.bookmarks);

  const userBookmarksIds = userBookmarks.map((a: any) => a.id);

  return (
    <div className={styles.container}>
      <p>{data.title}</p>
      {userBookmarksIds.includes(data.id) && <p>♥️</p>}
    </div>
  );
};
export default ArticleCard;
