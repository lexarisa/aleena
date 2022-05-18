import React, { useState } from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import ArticleCard from './ArticleCard';
import Article from './Article';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import ArticleAdd from './small/ArticleAdd';
import { deleteDocumentation } from '../../pages/api/documentation.api';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setCurrentArticle } from '../store/slices/article/article.slice';
import { updateBookmarks } from '../store/slices/user/user.slice';

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title, articles, id }: any) => {
  const dispatch = useAppDispatch();
  // const reduxArticles = useAppSelector((state) => state.article.articles);
  const user = useAppSelector((state) => state.user);

  const reduxCurrentArticle = useAppSelector(
    (state) => state.article.currentArticle
  );

  const [showArticle, setShowArticle] = useState(false);

  const handleShowArticle = () => {
    setShowArticle(false);
  };
  const handleClick = (article: any) => {
    console.log('im clicked wow');
    dispatch(setCurrentArticle(article));
    setShowArticle(true);
  };
  const handleDeleteDocument = (id: number) => {
    deleteDocumentation(id);
  };
  const handleBookmark = (user_id: number) => {
    dispatch(updateBookmarks(id));
    // console.log('userId', user.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <RoundButton
          button="S2"
          onClick={() => handleBookmark(id)}
          color="#333"
          textColor="#fff"
        />
        <RoundButton
          button="x"
          onClick={() => handleDeleteDocument(id)}
          color="#333"
          textColor="#fff"
        />
      </div>
      <div>
        {articles &&
          articles.map((article: any, index: number) => {
            return (
              <div key={index} onClick={() => handleClick(article)}>
                <ArticleCard data={article} />
              </div>
            );
          })}
      </div>
      <ArticleAdd documentation_id={id} />

      <div>
        {showArticle && (
          <Modal>
            <RoundButton
              button="x"
              onClick={handleShowArticle}
              color="#333"
              textColor="#fff"
            />
            <Article data={reduxCurrentArticle} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
