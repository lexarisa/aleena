import React, { useState } from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import ArticleCard from './ArticleCard';
import Article from './Article';
import Modal from './Modal';
import RoundButton from './small/RoundButton';

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title, articles }: any) => {
  const [showArticle, setShowArticle] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const handleShowArticle = () => {
    setShowArticle(false);
  };
  const handleClick = (article: any) => {
    setCurrentArticle(article);
    setShowArticle(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
      <div>
        {articles.map((article: any, index: number) => {
          return (
            <div key={index} onClick={() => handleClick(article)}>
              <ArticleCard data={article} />
              <div></div>
            </div>
          );
        })}
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
