import React from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Crypt from 'cryptr';

const Dashboard = () => {
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

  const token = context.query.token;

  const res = await fetch(`${process.env.BASEURL}/project/${token}`); //get userid

  const data = await res.json();

  return { props: { data: [data] }, notFound: false };
};