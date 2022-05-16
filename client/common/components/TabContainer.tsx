import React from 'react';
import styles from '../../styles/TabContainer.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

type TabContainerProps = {
  children: React.ReactNode;
};

const TabContainer = ({ children }: TabContainerProps) => {
  const router = useRouter();

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
