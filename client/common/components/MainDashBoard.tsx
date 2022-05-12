import React from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd';

const MainDashboard = () => {
  return (
    <div className={styles.container}>
      <MileStoneCard title="Milestone Title1" />
      <MileStoneCard title="Title2" />
      <MileStoneCard title="Title3" />
      <MileStoneCard title="Title4" />
      <MilestoneAdd />
    </div>
  );
};

export default MainDashboard;
