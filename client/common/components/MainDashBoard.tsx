import React, { useEffect } from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd'; //issue={data[1].tasks[0]}

const MainDashboard = ({ data }: any) => {
  useEffect(() => {
    const source = new EventSource('http://localhost:3001/updateMilestones');
    source.addEventListener('message', (message) => {
      console.log('Data from server:', message);
    });
  }, []);

  return (
    <div className={styles.container}>
      <MileStoneCard title={data[0].title} />
      {/* <MileStoneCard title={data[1].title} />
      <MileStoneCard title={data[2].title} />
      <MileStoneCard title={data[3].title} /> */}
      <MilestoneAdd />
    </div>
  );
};

export default MainDashboard;
