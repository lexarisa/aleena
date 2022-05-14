import React, { useEffect, useState } from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd'; //issue={data[1].tasks[0]}
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IMilestone } from '../types/IMilestone';

const MainDashboard = ({ data }: any) => {
  const [milestones, setMilestones] = useState(data);
  const router = useRouter();

  useEffect(() => {
    milestoneEvent();
  }, []);

  const milestoneEvent = () => {
    const source = new EventSource('http://localhost:3001/milestone/sse');
    source.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newMilestone = JSON.parse(message.data).data;

      if (event === 'create') {
        setMilestones((prevMilestones: any) => {
          return [...prevMilestones, newMilestone];
        });
      }
      if (event === 'delete') {
        setMilestones((prevMilestones: any) => {
          return prevMilestones.filter(
            (milestone: IMilestone) => milestone.id !== newMilestone.id
          );
        });
      }
      if (event === 'update') {
        setMilestones((prevMilestones: any) => {
          return prevMilestones.map((milestone: IMilestone) => {
            if (milestone.id === newMilestone.id) {
              return (milestone = newMilestone);
            } else {
              return milestone;
            }
          });
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      {milestones.map((item: any) => (
        <div key={item.id}>
          <Link
            href={{
              pathname: '/board/[milestone_id]',
              query: { milestone_id: item.id, project_id: router.query.id },
            }}
          >
            <a key={item.id}>
              <MileStoneCard title={item.title} status={item.status} />
            </a>
          </Link>
        </div>
      ))}
      <MilestoneAdd />
    </div>
  );
};

export default MainDashboard;
