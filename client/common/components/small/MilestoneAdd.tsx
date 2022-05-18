import React, { useState } from 'react';
import styles from '../../../styles/MileStoneAdd.module.css';
import { INewMilestone } from '../../types/INewMilestone';
import { createMilestone } from '../../../pages/api/milestoneApi';
import { useRouter } from 'next/router';

const MilestoneAdd = () => {
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
      <div>
        <button>Add New Milestone</button>
      </div>
      <div className={styles.collapsible}>
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
    </div>
  );
};

export default MilestoneAdd;

// export const getServerSideProps: GetServerSideProps = async (context) => {};
