import React, { useEffect } from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd'; //issue={data[1].tasks[0]}

const MainDashboard = ({ data }: any) => {
  useEffect(() => {
    const source = new EventSource('http://localhost:3001/milestone/sse');
    source.addEventListener('create', (message) => {
      console.log('Data from server Create:', message);
    });
    source.addEventListener('update', (message) => {
      console.log('Data from server Update:', message);
    });
    source.addEventListener('delete', (message) => {
      console.log('Data from server Delete:', message);
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
