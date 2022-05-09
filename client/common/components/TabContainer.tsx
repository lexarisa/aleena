import React from 'react';
import styles from '../../styles/TabContainer.module.css';
import ActiveLink from './ActiveLink';

type TabContainerProps = {
  children: React.ReactNode;
};
const TabContainer = ({ children }: TabContainerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabHead}>
        <div className={styles.tab}>
          <ActiveLink href="/dashboard">Dashboard</ActiveLink>
          <ActiveLink href="/board">Board</ActiveLink>
          <ActiveLink href="/documentation">Documentation</ActiveLink>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TabContainer;
