import React, { useEffect } from 'react';
import { MainDocumentation } from '../../common/components/MainDocumentation';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/store/hooks/redux-hooks';
import {
  setDocuments,
  setProjectDocuments,
} from '../../common/store/slices/documentation/documentation.slice';

const DocumentationPage = ({
  id,
  pathname,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject
  );
  // console.log('currentProject', currentProject.id);
  console.log('query', id);
  console.log('pathname in id', pathname);

  const dispatch = useAppDispatch();
  //get project id
  //@ts-ignore
  // const project_id = currentProject.id;
  const project_id = 32;

  // const milestone_id =pathname.includes('milestone'); //! HARDCODED
  const milestone_id = 1;

  useEffect(() => {
    fetchMilestoneDocuments();
    fetchProjectDocuments();
  }, []);

  const fetchMilestoneDocuments = async () => {
    const resMilestone = await fetch(
      `http://localhost:3001/documentation/${+milestone_id}`
    );
    const dataMilestone = await resMilestone.json();
    dispatch(setDocuments(dataMilestone[0].documents));
  };

  const fetchProjectDocuments = async () => {
    console.log('before sending', project_id);
    const resProject = await fetch(
      `http://localhost:3001/documentation/project/${+project_id}`
    );

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
  const { id } = context.query;
  // from what i understand i do not need this since i'm fetching from store
  return {
    props: { id: context.query, pathname: context.resolvedUrl },
    notFound: false,
  };
};
