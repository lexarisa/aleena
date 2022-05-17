import React, { useState, useEffect } from 'react';

import styles from '../../styles/MainDashBoard.module.css';
import DocumentCard from './DocumentCard';
import DocumentationAdd from './small/DocumentationAdd';
import IDocumentation from '../types/IDocumentation';
import {
  createDocument,
  deleteDocument,
  updateDocument,
  setDocuments,
  updateArticleDocument,
} from '../store/slices/documentation/documentation.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';

export const MainDocumentation = ({ data }: any) => {
  // const [documentation, setDocumentation] = useState(data[0].documents);
  const dispatch = useAppDispatch();
  const reduxDocumentation = useAppSelector(
    (state) => state.documentation.documents
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
        // setDocumentation((prevDocs: any) => {
        //   return [...prevDocs, { ...newDoc, articles: docArticles }]; //
        // });
        dispatch(createDocument(docWithArticles));
      }
      if (event === 'delete') {
        // setDocumentation((prevDocs: any) => {
        //   return prevDocs.filter(
        //     (document: IDocumentation) => document.id !== newDoc.id
        //   );
        // });
        dispatch(deleteDocument(newDoc));
      }
      if (event === 'update') {
        // setDocumentation((prevDocs: any) => {
        //   return prevDocs.map((document: IDocumentation) => {
        //     if (document.id === newDoc.id) {
        //       return (document = newDoc);
        //     } else {
        //       return document;
        //     }
        //   });
        // });
        dispatch(updateArticleDocument(newDoc));
      }
    });

    sourceArticle.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newDoc = JSON.parse(message.data).data;

      if (event === 'create') {
        // setDocumentation((prevDocs: any) => {
        //   return prevDocs.map((document: IDocumentation) => {
        //     if (document.id === newDoc.id) {
        //       return (document = newDoc);
        //     } else {
        //       return document;
        //     }
        //   });
        // });
        dispatch(updateArticleDocument(newDoc));
      }
      if (event === 'delete') {
        // setDocumentation((prevDocs: any) => {
        //   return prevDocs.filter(
        //     (document: IDocumentation) => document.id !== newDoc.id
        //   );
        // });
        dispatch(deleteDocument(newDoc));
      }
      if (event === 'update') {
        // setDocumentation((prevDocs: any) => {
        //   return prevDocs.map((document: IDocumentation) => {
        //     if (document.id === newDoc.id) {
        //       return (document = newDoc);
        //     } else {
        //       return document;
        //     }
        //   });
        // });
        dispatch(updateArticleDocument(newDoc));
      }
    });
  };

  return (
    <div className={styles.container}>
      {console.log('reduxDocs', reduxDocumentation)}
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
      <DocumentationAdd />
    </div>
  );
};
