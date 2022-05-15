import React, { useState } from 'react';
import styles from '../../../styles/MileStoneCard.module.css';
import { INewMilestone } from '../../types/INewMilistone';
import { createMilestone } from '../../../pages/api/milestoneApi';
import { useRouter } from 'next/router';

const MilestoneAdd = ({ project_id }: any) => {
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const router = useRouter();

  const handleCreateMilestone = async () => {
    if (milestoneTitle === '') return;
    const newMilestone: INewMilestone = {
      title: milestoneTitle,
      project_id: Number(router.query.id),
    };

    createMilestone(newMilestone);

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
