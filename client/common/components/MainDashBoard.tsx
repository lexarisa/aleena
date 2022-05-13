import React, { useEffect } from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd'; //issue={data[1].tasks[0]}
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainDashboard = ({ data }: any) => {
  const router = useRouter();
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
    source.onmessage = (message) => {
      console.log(message);
    };
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item: any) => (
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
