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
import { AiOutlineClose } from 'react-icons/ai';

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title, articles, id }: any) => {
  const [showArticle, setShowArticle] = useState(false);
  // const [bookmarked, setBookmarked] = useState([]);

  const dispatch = useAppDispatch();

  const reduxCurrentArticle = useAppSelector(
    (state) => state.article.currentArticle
  );

  const handleShowArticle = () => {
    setShowArticle(false);
  };
  const handleClick = (article: any) => {
    dispatch(setCurrentArticle(article));
    setShowArticle(true);
  };
  const handleDeleteDocument = (id: number) => {
    deleteDocumentation(id);
    setShowArticle(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>

        {/* <RoundButton
          button="x"
          onClick={() => handleDeleteDocument(id)}
          color="#333"
          textColor="#fff"
        /> */}
        <div onClick={() => handleDeleteDocument(id)}>
          <AiOutlineClose className={styles.icon} />
        </div>
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
      <ArticleAdd documentation_id={id} />

      <div>
        {showArticle && (
          <Modal>
            <Article
              data={reduxCurrentArticle}
              setShowArticle={setShowArticle}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
