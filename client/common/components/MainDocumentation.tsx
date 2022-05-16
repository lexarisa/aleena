import React, { useState } from 'react';

import styles from '../../styles/MainDashBoard.module.css';
import DocumentCard from './DocumentCard';
export const MainDocumentation = ({ data }: any) => {
  const [documentation, setDocumentation] = useState(data[0].documents);

  return (
    <div className={styles.container}>
      {documentation.map((item: any) => (
        <div key={item.id}>
          <div key={item.id}>
            <DocumentCard title={item.title} articles={item.articles} />
          </div>
        </div>
      ))}
    </div>
  );
};
