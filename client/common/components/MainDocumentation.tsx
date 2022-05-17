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

export const MainDocumentation = () => {
  const dispatch = useAppDispatch();

  //TODO add check to see in what context we are working under
  // const reduxDocumentation = useAppSelector(
  //   (state) => state.documentation.documents
  // );
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

  return (
    <div className={styles.container}>
      {console.log('reduxDocs', reduxProjectDocumentation)}
      {reduxProjectDocumentation.map(
        (
          item: any //! need to know if i'm querying for project or milestone
        ) => (
          <div key={item.id}>
            <div key={item.id}>
              <DocumentCard
                title={item.title}
                articles={item.articles}
                id={item.id}
              />
            </div>
          </div>
        )
      )}
      <DocumentationAdd />
    </div>
  );
};
