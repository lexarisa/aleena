import React, { useEffect } from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import MilestoneAdd from './../common/components/small/MilestoneAdd';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { setMilestones } from '../common/store/slices/milestone/milestone.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '../common/store/hooks/redux-hooks';
import { setAllUsersProject } from '../common/store/slices/projects/project.slice';
import Meta from '../common/components/Meta';
import { getAllUsersInProject } from './api/user.api';
// const source = new EventSource('https://dcb2-45-130-134-153.eu.ngrok.io/feed');

const Dashboard = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchMilestones();
    fetchAllUsersProject();
  }, []);

  const fetchAllUsersProject = async () => {
    getAllUsersInProject(Number(router.query.id))
    .then((res) => {
      console.log(res)
      dispatch(setAllUsersProject(res))
    })
    .catch((err) => console.log(err)); 
  }

  const fetchMilestones = async () => {
    const res = await fetch(
      // `https://localhost:3001/milestone/dash/${id}`
      `https://ae99-45-130-134-153.eu.ngrok.io/milestone/dash/${id}`
    );

    const data = await res.json();

    console.log('hey ?????', data);

    dispatch(setMilestones(data));
  };




  return (
    <>
      <Meta title="" />
      <DashboardLayout>
        <TabContainer>
          <MainDashboard />
        </TabContainer>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  console.log('context query', context.query);

  return { props: { id: id }, notFound: false };
};
