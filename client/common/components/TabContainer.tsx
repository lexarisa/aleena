import Link from 'next/link';
import React from 'react';
import styles from '../../styles/TabContainer.module.css';

type TabContainerProps = {
  children: React.ReactNode;
};
const TabContainer = ({ children }: TabContainerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabHead}>
        <div className={styles.tab}>
          <Link href={{ pathname: '/' }}>{children}</Link>
        </div>
      </div>
    </div>
  );
};

export default TabContainer;
