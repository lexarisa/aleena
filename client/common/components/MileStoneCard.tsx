import React from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import Image from 'next/image';
import Card from './Card';

interface MileStoneCardProp {
  title: String;
  id: Number;
}

const MileStoneCard = ({ title, task }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div>
          <Image
            src="https://github.com/thaiscosta.png"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div></div>
      <div className={styles.tags}>
        {/* {issue ?  issue.map( */}
        {/* <Card title={task.title} />
        <Card title={task.title} />: null */}
      </div>
    </div>
  );
};

export default MileStoneCard;
