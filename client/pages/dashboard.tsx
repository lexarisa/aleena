import React, { useEffect } from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import MilestoneAdd from './../common/components/small/MilestoneAdd';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Crypt from 'cryptr';
import { setMilestones } from '../common/store/slices/milestone/milestone.slice';
import { store } from '../common/store/index.store';
import {
  useAppDispatch,
  useAppSelector,
} from '../common/store/hooks/redux-hooks';
import Router from 'next/router';
import { updateMilestone } from './api/milestoneApi';
// const source = new EventSource('https://dcb2-45-130-134-153.eu.ngrok.io/feed');

const Dashboard = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
      fetchMilestones();
    }, [])

    const fetchMilestones = async () => {
      const res = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/milestone/dash/${id}`);

      const data = await res.json();

      console.log('hey ?????', data)

      dispatch(setMilestones(data))
    }

    return (
    <DashboardLayout>
      <TabContainer>
        <MainDashboard />
      </TabContainer>
    </DashboardLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('what?');

  const id = context.query.id;

  return { props: { id: id }, notFound: false };
};
