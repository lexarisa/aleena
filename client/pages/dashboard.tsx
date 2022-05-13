import React, { useEffect } from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import MilestoneAdd  from './../common/components/small/MilestoneAdd'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Crypt from 'cryptr';
import Feed from '../common/components/Feed';
// const source = new EventSource('https://dcb2-45-130-134-153.eu.ngrok.io/feed');

const Dashboard = ({
  data, project_id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
    <DashboardLayout>
      <TabContainer>
        <MainDashboard data={data} />
        <MilestoneAdd project_id={project_id} />
      </TabContainer>
      <Feed />
    </DashboardLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const res = await fetch(`${process.env.BASEURL}/milestone/dash/${id}`);

  const data = await res.json();

  console.log(data[1].tasks[0])

 

  return { props: { data: data, project_id: id }, notFound: false };
};
