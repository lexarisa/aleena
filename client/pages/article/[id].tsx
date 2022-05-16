import React from 'react';
// import Board from '../../common/components/Board';
import Article from '../../common/components/Article';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const DocumentationPage = ({
  data,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('data as props', data);

  return (
    <DashboardLayout>
      <TabContainer>
        <Article data={data} id={id} />
      </TabContainer>
    </DashboardLayout>
  );
};

export default DocumentationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context.query', context.query);
  const { id } = context.query;
  console.log('id');
  const res = await fetch(`http://localhost:3001/article/${id}`);

  const data = await res.json();
  console.log('article data', data);

  return { props: { data, id: context.query }, notFound: false };
};
