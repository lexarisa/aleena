import React, { useState, useEffect } from 'react';

import styles from '../../styles/MainDashBoard.module.css';
import DocumentCard from './DocumentCard';
import DocumentationAdd from './small/DocumentationAdd';
import IDocumentation from '../types/IDocumentation';
import RoundButton from './small/RoundButton';
export const MainDocumentation = ({ data }: any) => {
  const [documentation, setDocumentation] = useState(data[0].documents);

  useEffect(() => {
    documentationEvent();
  }, []);

  const documentationEvent = () => {
    const source = new EventSource('http://localhost:3001/documentation/sse');
    source.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newDoc = JSON.parse(message.data).data;

      if (event === 'create') {
        const docArticles = newDoc.articles ? newDoc.articles : [];
        setDocumentation((prevDocs: any) => {
          return [...prevDocs, { ...newDoc, articles: docArticles }]; //
        });
      }
      if (event === 'delete') {
        setDocumentation((prevDocs: any) => {
          return prevDocs.filter(
            (document: IDocumentation) => document.id !== newDoc.id
          );
        });
      }
      if (event === 'update') {
        setDocumentation((prevDocs: any) => {
          return prevDocs.map((document: IDocumentation) => {
            if (document.id === newDoc.id) {
              return (document = newDoc);
            } else {
              return document;
            }
          });
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      {documentation.map((item: any) => (
        <div key={item.id}>
          <div key={item.id}>
            <DocumentCard
              title={item.title}
              articles={item.articles}
              id={item.id}
            />
          </div>
        </div>
      ))}
      <DocumentationAdd />
    </div>
  );
};
