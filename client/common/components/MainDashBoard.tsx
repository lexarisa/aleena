import React from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainDashboard = ({ data }: any) => {
  const router = useRouter();
  console.log(router);
  console.log(router.query.id);

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id}>
          <Link
            href={{
              pathname: '/board/[id]',
              query: { milestone_id: item.id, project_id: router.query.id },
            }}
          >
            <a key={item.id}>
              <MileStoneCard title={item.title} status={item.status} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MainDashboard;
