import React, { useEffect } from 'react';
import styles from '../../styles/TabContainer.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppSelector } from '../store/hooks/redux-hooks';

type TabContainerProps = {
  children: React.ReactNode;
};

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string; // 👈️ type children
};

const ActiveLink = ({ children, href }: ActiveLinkProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`styles.${router.pathname === href ? 'active' : 'links'}`}>
        {children}
      </a>
    </Link>
  );
};

const TabContainer = ({ children }: TabContainerProps) => {
  const router = useRouter();
  const milestone = useAppSelector(state => state.milestone.currentMilestone)
  
  useEffect(() => {
  
  })

  console.log('hmmm', milestone)

  return (
    <div className={styles.container}>
      <div className={styles.tabHead}>
        <div className={styles.tab}>
          <Link href="/dashboard">
            <a className={styles.active}>Dashboard</a>
          </Link>
          <Link href="/board">
            <a className={styles.active}>Board</a>
          </Link>
          <Link href="/documentation">
            <a className={styles.active}>Documentation</a>
          </Link>
           <a className={styles.active}>{milestone}</a>
        </div>
      </div>
      <div className={styles.tabContent}>{children}</div>
    </div>
  );
};

export default TabContainer;
