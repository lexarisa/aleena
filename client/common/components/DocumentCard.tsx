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

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title, articles, id }: any) => {
  const dispatch = useAppDispatch();
  // const reduxArticles = useAppSelector((state) => state.article.articles);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <RoundButton
          button="delete"
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
