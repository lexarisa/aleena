import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/MainDashBoard.module.css';
import DocumentCard from './DocumentCard';
export const MainDocumentation = ({ data }: any) => {
  const [documentation, setDocumentation] = useState(data[0].documents);
  return (
    <div className={styles.container}>
      {documentation.map((item: any) => (
        <div key={item.id}>
          <Link
            href={{
              pathname: '/documentation/[id]',
              query: { id: item.id },
            }}
          >
            <a key={item.id}>
              <DocumentCard title={item.title} />
            </a>
          </Link>
        </div>
      ))}
      {/* <MilestoneAdd /> */}
    </div>
  );
};
