import React from 'react';
import Board from '../common/components/Board';
import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const BoardPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);
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
  const res = await fetch(`http://localhost:3001/milestone/2`); //need milestone id
  console.log('hpalsdfsf');
  const data = await res.json();
  console.log(data);

  return { props: { data }, notFound: false };
};
