import React from 'react';
import styles from '../../styles/MileStoneCard.module.css';
import Image from 'next/image';
import Card from './Card';
import { useAppSelector } from '../store/hooks/redux-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MileStoneCardProp {
  title: String;
  id: Number;
}

const MileStoneCard = ({ title, status, milestone_id }: any) => {
  const router = useRouter();
  // console.log('router pathname in milestone card', router.pathname);
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

        <Link
          href={{
            pathname: `/documentation/[project_id]`,
            query: {
              project_id: router.query.id,
              milestone_id: milestone_id,
            },
          }}
        >
          <a>Docs</a>
        </Link>
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
