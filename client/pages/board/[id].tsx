import React, { useEffect } from 'react';
import Board from '../../common/components/Board';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { setTasks } from '../../common/store/slices/task/task.slices';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/store/hooks/redux-hooks';
import { formatData } from '../project/[token]';

const BoardPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:3001/milestone/${id}`);

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
