import React, { useState } from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import ArticleCard from './ArticleCard';
import Article from './Article';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import ArticleAdd from './small/ArticleAdd';
import { deleteDocumentation } from '../../pages/api/documentation.api';

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title, articles, id }: any) => {
  const [showArticle, setShowArticle] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const handleShowArticle = () => {
    setShowArticle(false);
  };
  const handleClick = (article: any) => {
    setCurrentArticle(article);
    setShowArticle(true);
  };
  const handleDeleteDocument = (id: number) => {
    console.log('will delete doc', id);
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
        {articles.map((article: any, index: number) => {
          return (
            <div key={index} onClick={() => handleClick(article)}>
              <ArticleCard data={article} />
            </div>
          );
        })}
      </div>
      <div className={styles.addButton}>
        <ArticleAdd />
      </div>
      <div>
        {showArticle && (
          <Modal>
            <RoundButton
              button="x"
              onClick={handleShowArticle}
              color="#333"
              textColor="#fff"
            />
            <Article data={currentArticle} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
