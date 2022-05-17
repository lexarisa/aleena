import React, { useEffect } from 'react';
import { MainDocumentation } from '../../common/components/MainDocumentation';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../../common/store/hooks/redux-hooks';
import {
  setDocuments,
  setProjectDocuments,
} from '../../common/store/slices/documentation/documentation.slice';

const DocumentationPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchMilestoneDocuments();
    fetchProjectDocuments();
    // dispatch(setDocuments(dataMilestone[0].documents));
    // dispatch(setProjectDocuments(dataProject[0].documents));
  }, []);
  const fetchMilestoneDocuments = async () => {
    const resMilestone = await fetch(
      `http://localhost:3001/documentation/${id}`
    );
    const dataMilestone = await resMilestone.json();
    dispatch(setDocuments(dataMilestone[0].documents));
  };
  const fetchProjectDocuments = async () => {
    const resProject = await fetch(`http://localhost:3001/documentation/${id}`);
    const initialRes = await resProject.json();
    const milestones = initialRes.milestones;
    const filteredMilestones = milestones.filter((m: any) => {
      return m.documents.length !== 0;
    });

    const dataProject = filteredMilestones
      .map((d: any) => {
        return d.documents;
      })
      .flat();

    dispatch(setProjectDocuments(dataProject));
  };

  return (
    <DashboardLayout>
      <TabContainer>
        <MainDocumentation />
      </TabContainer>
    </DashboardLayout>
  );
};

export default DocumentationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { id } = context.query;

  return {
    props: { id: context.query },
    notFound: false,
  };
};
