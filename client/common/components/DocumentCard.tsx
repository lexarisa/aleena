import React from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import Article from './Article';

interface DocumentCardProp {
  title: String;
  milestone_id: Number;
  id: Number;
}

const DocumentCard = ({ title }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
      <div></div>
      {/* <div className={styles.tags}> */}
      {/* {issue ?  issue.map(
        <Article title={task.title} />
       <Article title={task.title} />: null */}
      {/* </div> */}
    </div>
  );
};

export default DocumentCard;
