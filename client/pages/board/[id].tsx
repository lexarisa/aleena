import React, { useEffect } from 'react';
import Board from '../../common/components/Board';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { setTasks } from '../../common/store/slices/task/task.slices';
import { useAppDispatch } from '../../common/store/hooks/redux-hooks';

const BoardPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(setTasks(data[0].tasks))
  })

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

  const res = await fetch(`http://localhost:3001/milestone/${id}`).then(res => {
    return res.json();
  })

  return { props: { data: res }, notFound: false };

}

