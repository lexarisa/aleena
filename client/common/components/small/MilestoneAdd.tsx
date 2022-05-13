import React, { useState } from 'react';
import styles from '../../../styles/MileStoneCard.module.css';
import { INewMilestone } from '../../types/INewMilistone';
import { createMilestone } from '../../../pages/api/milestoneApi';

const MilestoneAdd = () => {
  const [milestoneTitle, setMilestoneTitle] = useState('');

  const handleCreateMilestone = async () => {
    const newMilestone: INewMilestone = {
      title: milestoneTitle,
      project_id: 10, //! hardcoded
    };
    createMilestone(newMilestone).then((data) => console.log(data));
    setMilestoneTitle('');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMilestoneTitle(e.currentTarget.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateMilestone();
    }
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="milestone"
        id="milestone"
        value={milestoneTitle}
        placeholder="Add new milestone"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MilestoneAdd;

// export const getServerSideProps: GetServerSideProps = async (context) => {};