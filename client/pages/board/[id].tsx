import React from 'react';
import Board from '../../common/components/Board';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const BoardPage = ({
  data,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log('data as props', data);

  return (
    <DashboardLayout>
      <TabContainer>
        <Board data={data[0].tasks} id={id} />
      </TabContainer>
    </DashboardLayout>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { id } = context.query;

  const res = await fetch(`http://localhost:3001/milestone/${id}`); //need milestone id

  const data = await res.json();

  return { props: { data, id: context.query }, notFound: false };
};
