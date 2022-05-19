import React, { useState } from 'react';
import styles from '../../../styles/MilestoneAdd.module.css';
import { INewMilestone } from '../../types/INewMilestone';
import { createMilestone } from '../../../pages/api/milestoneApi';
import { useRouter } from 'next/router';

import CustomButton from './CustomButton';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';

const MilestoneAdd = () => {
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
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
      {showInput ? (
        <div className={styles.buttonContainer}>
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
            <button className={styles.add} onClick={handleCreateMilestone}>
              <AiOutlinePlus className={styles.addButton} />
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.button} onClick={() => setShowInput(true)}>
          New Milestone
          <AiOutlinePlus className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default MilestoneAdd;

// export const getServerSideProps: GetServerSideProps = async (context) => {};
