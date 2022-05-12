import React from 'react';
import Board from '../common/components/Board';
import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const BoardPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <DashboardLayout>
      <TabContainer>
        <Board data={data} />
      </TabContainer>
    </DashboardLayout>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/milestone/1`); //need milestone id

  const data = await res.json();

  return { props: { data }, notFound: false };
};
