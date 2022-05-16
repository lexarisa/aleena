import React, { useEffect } from 'react';
import Board from '../../common/components/Board';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../common/store/index.store';
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => 
  async (context) => {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3001/milestone/${id}`).then(res => {
    return res.json();
  })

  console.log(res);

  console.log(store.getState())
  // @ts-ignore
  // const data = await store.dispatch(setTasks(res))

  // const reduxTasks = store.getState().task.allTasks

  return { props: { data: res }, notFound: false };

})



// export const getServerSideProps: GetServerSideProps = async (context) => {
  
//   const { id } = context.query;

//   const res = await fetch(`http://localhost:3001/milestone/${id}`); //need milestone id

//   const data = await res.json();


//   return { props: { data }, notFound: false };
// };
