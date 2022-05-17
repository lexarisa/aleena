import React, { useEffect } from 'react';
import styles from '../../styles/TabContainer.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setCurrentMilestone } from '../store/slices/milestone/milestone.slice';

type TabContainerProps = {
  children: React.ReactNode;
};

const TabContainer = ({ children }: TabContainerProps) => {
  const router = useRouter();
  const milestone = useAppSelector((state) => state.milestone.currentMilestone);

  console.log(milestone);
  useEffect(() => {});

  return (
    <div className={styles.container}>
      <div className={styles.tabHead}>
        <div className={styles.tab}>
          <Link
            href={{
              pathname: '/dashboard',
              query: { id: router.query.id },
            }}
          >
            <a className={styles.active}>Dashboard</a>
          </Link>
          <Link
            href={{
              pathname: '/board',
              query: {
                milestone_id: router.query.id,
                project_id: router.query.id,
              },
            }}
          >
            <a className={styles.active}>Board</a>
          </Link>
          <Link href="/documentation">
            <a className={styles.active}>Documentation</a>
          </Link>
          <h1 className={styles.active}>
            {milestone ? milestone.title : null}
          </h1>
        </div>
        <div className={styles.users}>
          <div className={styles.avatar}>
            <Image
              src="https://github.com/thaiscosta.png"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.avatar}>
            <Image
              src="https://github.com/thaiscosta.png"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>

      <div className={styles.tabContent}>{children}</div>
    </div>
  );
};

export default TabContainer;
