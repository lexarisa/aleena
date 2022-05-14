import React from 'react';
import { deleteMilestone } from '../../../pages/api/milestoneApi';
import { updateMilestone } from '../../../pages/api/milestoneApi';

export const MilestoneOptions = (data: any) => {
  const handleClick = () => {
    deleteMilestone(data.id);
  };
  return <button onClick={handleClick}>x</button>;
};
