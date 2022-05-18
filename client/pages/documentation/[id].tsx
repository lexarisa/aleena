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
import { setBookmarks } from '../../common/store/slices/user/user.slice';

const DocumentationPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject
  );
  const user_id = useAppSelector((state) => state.user.id);

  const dispatch = useAppDispatch();
  let queries = Object.values(query);

  //@ts-ignore
  const project_id = currentProject.id;
  let milestone_id = queries.length > 1 ? queries[0] : 1; // 1 as fail-safe

  useEffect(() => {
    fetchMilestoneDocuments();
    fetchProjectDocuments();
    fetchUserBookmarks();
  }, []);

  const fetchMilestoneDocuments = async () => {
    const resMilestone = await fetch(
      //@ts-ignore
      // `http://ae99-45-130-134-153.eu.ngrok.io/documentation/${+milestone_id}`
      `https://ae99-45-130-134-153.eu.ngrok.io/documentation/${+milestone_id}`
    );
    const dataMilestone = await resMilestone.json();
    dispatch(setDocuments(dataMilestone[0].documents));
  };

  const fetchProjectDocuments = async () => {
    const resProject = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/documentation/project/${+project_id}`
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
  const fetchUserBookmarks = async () => {
    console.log('before sending user_id', user_id);
    const resBookmarks = await fetch(
      `http://localhost:3001/user/bookmarks/${user_id}`
    );
    const bookmarks = await resBookmarks.json();
    console.log('bookmarks in id', bookmarks);
    dispatch(setBookmarks(bookmarks.articles));
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
  // from what i understand i do not need this since i'm fetching from store
  return {
    props: { query: context.query },
    notFound: false,
  };
};
