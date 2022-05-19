import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import { IoStar } from 'react-icons/io5';

import { useAppSelector } from '../store/hooks/redux-hooks';

const ArticleCard = ({ data }: any) => {
  // const dispatch = useAppDispatch();
  const userBookmarks = useAppSelector((state) => state.user.bookmarks);

  if (userBookmarks) {
    const userBookmarksIds = userBookmarks.map((a: any) => a.id); // map and create id array
  
    return (
      <div className={styles.container}>
        <p>{data.title}</p>
        {userBookmarksIds.includes(data.id) && <IoStar />}
      </div>
    );
  }
};
export default ArticleCard;
