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
import { useRouter } from 'next/router';

export const MainDocumentation = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  // console.log('query', router.query);
  // console.log('pathname', router.pathname);
  let reduxDocumentation = [];
  const inMilestone = router.query.milestone_id;
  inMilestone
    ? (reduxDocumentation = useAppSelector(
        (state) => state.documentation.documents
      ))
    : (reduxDocumentation = useAppSelector(
        (state) => state.documentation.projectDocuments
      ));
  const userBookmarks = useAppSelector((state) => state.user.bookmarks);
  console.log('userBookmarks', userBookmarks);
  useEffect(() => {
    documentationEvent();
  }, []);

  const documentationEvent = () => {
    const sourceDoc = new EventSource(
      'https://ae99-45-130-134-153.eu.ngrok.io/documentation/sse'
    );
    const sourceArticle = new EventSource(
      'https://ae99-45-130-134-153.eu.ngrok.io/article/sse'
    );

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
        console.log('article was created');
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
      {reduxDocumentation.map((item: any) => (
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
      <DocumentationAdd inMilestone={inMilestone} />
    </div>
  );
};
