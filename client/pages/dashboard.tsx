import React from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Crypt from 'cryptr';

const Dashboard = ({
  data,
  project_id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <DashboardLayout>
      <TabContainer>
        <MainDashboard data={data} project_id={project_id} />
      </TabContainer>
    </DashboardLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  console.log(context);

  const res = await fetch(`${process.env.BASEURL}/milestone/dash/${id}`);

  const data = await res.json();

  console.log('data', data);
  return { props: { data: data, project_id: id }, notFound: false };
};
