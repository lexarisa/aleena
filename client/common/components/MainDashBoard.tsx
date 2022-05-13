import React from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';

const MainDashboard = ({data}: any) => {
  return (
    <div className={styles.container}>
      <MileStoneCard title={data[0].title} issue={data[1].tasks[0]} />
      <MileStoneCard title={data[1].title} issue={data[0]} />
      <MileStoneCard title={data[2].title} issue={data[0]} />
      <MileStoneCard title={data[3].title} issue={data[0]} />
    </div>
  );
};

export default MainDashboard;
