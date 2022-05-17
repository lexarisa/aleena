import React, { useEffect } from 'react';
import { Resources } from '../../common/components/Resources';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../../common/store/hooks/redux-hooks';
import {
  // setDocuments,
  setProjectDocuments,
} from '../../common/store/slices/documentation/documentation.slice';

const ResourcesPage = ({
  dataProject,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(dataProject.milestones);
    dispatch(setProjectDocuments(dataProject.milestones));
  });

  return (
    <DashboardLayout>
      <TabContainer>
        <Resources />
      </TabContainer>
    </DashboardLayout>
  );
};

export default ResourcesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const resProject = await fetch(
    `http://localhost:3001/documentation/project/1`
  ); // for project
  const dataProject = await resProject.json();

  return {
    props: { dataProject, id: context.query },
    notFound: false,
  };
};
