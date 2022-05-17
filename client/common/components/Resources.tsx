import React, { useState, useEffect } from 'react';

import styles from '../../styles/MainDashBoard.module.css';
import DocumentCard from './DocumentCard';
import DocumentationAdd from './small/DocumentationAdd';
import IDocumentation from '../types/IDocumentation';
import {
  createDocument,
  deleteDocument,
  updateArticleDocument,
} from '../store/slices/documentation/documentation.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';

export const Resources = () => {
  const dispatch = useAppDispatch();

  const reduxProjectDocumentation = useAppSelector(
    (state) => state.documentation.projectDocuments
  );
  useEffect(() => {
    documentationEvent();
  }, []);

  const documentationEvent = () => {
    const sourceDoc = new EventSource(
      'http://localhost:3001/documentation/sse'
    );
    const sourceArticle = new EventSource('http://localhost:3001/article/sse');

    // add article sse here
    sourceDoc.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newDoc = JSON.parse(message.data).data;

      if (event === 'create') {
        console.log('received sse');
        const docWithArticles = newDoc.articles
          ? newDoc
          : { ...newDoc, articles: [] };

        dispatch(createDocument(docWithArticles));
      }
      if (event === 'delete') {
        dispatch(deleteDocument(newDoc));
      }
      if (event === 'update') {
        dispatch(updateArticleDocument(newDoc));
      }
    });

    sourceArticle.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newDoc = JSON.parse(message.data).data;

      if (event === 'create') {
        dispatch(updateArticleDocument(newDoc));
      }
      if (event === 'delete') {
        dispatch(deleteDocument(newDoc));
      }
      if (event === 'update') {
        dispatch(updateArticleDocument(newDoc));
      }
    });
  };
  const filteredMilestones = reduxProjectDocumentation.filter((m) => {
    return m.documents.length !== 0;
  });
  const allDocs = filteredMilestones.map((d) => {
    return d.documents;
  });
  const allFlatDocs = allDocs.flat();
  return (
    <div className={styles.container}>
      {allFlatDocs.map((item: any) => (
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
