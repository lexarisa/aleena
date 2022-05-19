import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { INewArticle } from '../../types/INewArticle';
import { createArticle } from '../../../pages/api/article.api';
// import styles from '../../../styles/MileStoneCard.module.css';
import styles from '../../../styles/Card.module.css';
const ArticleAdd = (props: any) => {
  const [articleTitle, setArticleTitle] = useState('');
  const router = useRouter();

  const handleCreateArticle = async () => {
    if (articleTitle === '') return;
    const newArticle: INewArticle = {
      documentation_id: Number(props.documentation_id),
      title: articleTitle,
      content: '',
    };

    createArticle(newArticle);

    setArticleTitle('');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setArticleTitle(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateArticle();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="milestone"
        id="article"
        value={articleTitle}
        placeholder="Add new article"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ArticleAdd;
