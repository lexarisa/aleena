import React, { useEffect, useState } from 'react';
import styles from '../../styles/MainDashBoard.module.css';
import MileStoneCard from './MileStoneCard';
import MilestoneAdd from './small/MilestoneAdd'; //issue={data[1].tasks[0]}
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IMilestone } from '../types/IMilestone';
import {
  createMilestone,
  deleteMilestone,
  setCurrentMilestone,
  updateMilestones,
} from '../store/slices/milestone/milestone.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';

const MainDashboard = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const reduxMilestones = useAppSelector(state => state.milestone.allMilestones);
  const reduxCurrentMilestones = useAppSelector(state => state.milestone.currentMilestone);
  const reduxCurrentProject = useAppSelector(state => state.project.currentProject)


  useEffect(() => {
    milestoneEvent();
  });

  const handleClickHere = (milestone: any) => {
    dispatch(setCurrentMilestone(milestone));
  };

  const milestoneEvent = () => {
    const source = new EventSource('http://localhost:3001/milestone/sse');

    source.addEventListener('message', (message) => {
      const event = JSON.parse(message.data).event;
      const newMilestone = JSON.parse(message.data).data;

      if (event === 'create') {

        console.log('urzeMilestone', newMilestone)
        //@ts-ignore
        if (newMilestone.project_id === reduxCurrentProject.id) {
          dispatch(updateMilestones(newMilestone));
        }

      }

      if (event === 'delete') {
         //@ts-ignore
        if (newMilestone.project_id === reduxCurrentProject.id) {
          dispatch(deleteMilestone(newMilestone));
        } 
      }

      if (event === 'update') {
         //@ts-ignore
        if (newMilestone.project_id === reduxCurrentProject.id) {
          dispatch(updateMilestones(newMilestone));
        }    
      }

      source.close();
    });
  };

  return (
    <div className={styles.container}>
      {reduxMilestones.map((item: any) => (
        <div key={item.id}>
          <Link
            href={{
              pathname: '/board/[milestone_id]',
              query: { milestone_id: item.id, project_id: router.query.id },
            }}
          >
            <a onClick={async () => await handleClickHere(item)} key={item.id}>
              {/* <a key={item.id}> */}
              <MileStoneCard
                title={item.title}
                status={item.status}
                milestone_id={item.id}
              />
            </a>
          </Link>
        </div>
      ))}
      <MilestoneAdd />
    </div>
  );
};

export default MainDashboard;
