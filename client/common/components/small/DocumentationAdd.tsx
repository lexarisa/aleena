import React, { useState } from 'react';
import styles from '../../../styles/MileStoneCard.module.css';
import { INewDocumentation } from '../../types/INewDocumentation';
import { createDocumentation } from '../../../pages/api/documentation.api';
import { useRouter } from 'next/router';

const DocumentationAdd = () => {
  const [documentationTitle, setDocumentationTitle] = useState('');
  const router = useRouter();

  const handleCreateDocumentation = async () => {
    if (documentationTitle === '') return;
    const newDocumentation: INewDocumentation = {
      title: documentationTitle,
      milestone_id: Number(router.query.id),
    };

    createDocumentation(newDocumentation);

    setDocumentationTitle('');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDocumentationTitle(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateDocumentation();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="documentation"
        id="documentation"
        value={documentationTitle}
        placeholder="Add new documentation"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default DocumentationAdd;
