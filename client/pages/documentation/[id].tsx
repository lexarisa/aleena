import React, { useEffect } from 'react';
import { MainDocumentation } from '../../common/components/MainDocumentation';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../../common/store/hooks/redux-hooks';
import { setDocuments } from '../../common/store/slices/documentation/documentation.slice';

const DocumentationPage = ({
  data,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDocuments(data[0].documents));
  });

  return (
    <DashboardLayout>
      <TabContainer>
        <MainDocumentation data={data} id={id} />
      </TabContainer>
    </DashboardLayout>
  );
};

export default DocumentationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3001/documentation/${id}`);
  const data = await res.json();
  console.log('data fetched', data);

  return { props: { data, id: context.query }, notFound: false };
};
