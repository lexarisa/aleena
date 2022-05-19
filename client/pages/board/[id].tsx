import React, { useEffect } from 'react';
import Board from '../../common/components/Board';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  setMilestoneTasks,
  setTasks,
} from '../../common/store/slices/task/task.slices';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/store/hooks/redux-hooks';
import { formatData } from '../project/[token]';

const BoardPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const milestone = useAppSelector((state) => state.milestone.currentMilestone);
  const project = useAppSelector((state) => state.project.currentProject);
  const user_id = useAppSelector((state) => state.user.id);
  const project_id = project.id;

  useEffect(() => {
    fetchMilestoneTasks();
    fetchAllTasks();
  }, []);

  const fetchMilestoneTasks = async () => {
    const res = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/milestone/${milestone.id}`
    );
    const data = await res.json();

    const formatTasks = formatData(data, 'tasks');

    dispatch(setMilestoneTasks(formatTasks));
  };

  const fetchAllTasks = async () => {
    const res = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/dashboard/`
    );

    const data = await res.json();

    const formatTasks = formatData(data, 'tasks');

    dispatch(setTasks(formatTasks));
  };

  return (
    <DashboardLayout>
      <TabContainer>
        <Board />
      </TabContainer>
    </DashboardLayout>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return { props: { id: id }, notFound: false };
};
