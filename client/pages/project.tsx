import React from 'react';
import MileStoneCard from '../common/components/MileStoneCard';
import CustomButton from '../common/components/small/MainBtn';
import styles from '../styles/projectPage.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`${process.env.BASEURL}/project/${context.params}`);
//   const selectedProject = await res.json();

//   if (!selectedProject) {
//     return { notFound: true };
//   }
//   return { props: { selectedProject } };

const project = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('hi', data);
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div>
          <h1>Welcome to Alena, user</h1>
        </div>
        <div className={styles.selectCard}>
          <div className={styles.addButton}>+</div>
          <p>Create a new project</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.BASEURL}/project/${context.params}`);

  const data = await res.json();

  return { props: { data: 'Hello' }, notFound: false };
};

export default project;
