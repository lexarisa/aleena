import React, { useState } from 'react';
import styles from '../../../styles/DocumentationCard.module.css';
import { INewDocumentation } from '../../types/INewDocumentation';
import { createDocumentation } from '../../../pages/api/documentation.api';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../store/hooks/redux-hooks';

const DocumentationAdd = (props: any) => {
  const [documentationTitle, setDocumentationTitle] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const router = useRouter();

  const handleCreateDocumentation = async () => {
    let newDocumentation = {} as INewDocumentation;

    //if in a milestone
    if (props.inMilestone) {
      if (documentationTitle === '') return;
      newDocumentation = {
        title: documentationTitle,
        milestone_id: props.inMilestone,
      };
    } else {
      //if not in a milestone
      if (documentationTitle === '') return;
      if (selectedMilestone === undefined) return;
      newDocumentation = {
        title: documentationTitle,
        milestone_id: selectedMilestone,
      };
    }

    //if not in a milestone

    createDocumentation(newDocumentation);
    setDocumentationTitle('');
  };

  const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setDocumentationTitle(e.currentTarget.value);
  };
  const handleKeyDownTitle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateDocumentation();
    }
  };

  // 1. get all project milestone title and ids

  const reduxMilestones = useAppSelector(
    (state) => state.milestone.allMilestones
  );
  // 2. set them in array
  const availableMilestones = reduxMilestones.map((m) => {
    return { title: m.title, id: m.id };
  });

  return (
    <div className={styles.container}>
      {!props.inMilestone && (
        <select
          name="milestone"
          id="milestone"
          value={selectedMilestone}
          onChange={(e) => setSelectedMilestone(e.target.value)}
          className={styles.select}
        >
          <option value="">Select milestone</option>
          {availableMilestones.map((option: any) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      )}

      <input
        className={styles.input}
        type="text"
        name="documentation"
        id="documentation"
        value={documentationTitle}
        placeholder="Add new documentation"
        onChange={handleChangeTitle}
        onKeyDown={handleKeyDownTitle}
      />
    </div>
  );
};

export default DocumentationAdd;
