import React from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd';
import Link from 'next/link';
import { useRouter } from 'next/router';
const MainDashboard = ({ data }: any) => {
  const router = useRouter();
  console.log(router);
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id}>
          <Link
            href={{
              pathname: '/board/[id]',
              query: { id: item.id },
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
