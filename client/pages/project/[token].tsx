import React from 'react';
import styles from '../../styles/projectPage.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ITask from '../../common/types/ITask';
import Link from 'next/link';
import Cryptr from 'cryptr';

const project = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const handleClick = () => {
    // go to another page ???
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div>
          <h1>Welcome to Aleena, {data.username}</h1>
        </div>
        <div className={styles.selectCard}>
          <div className={styles.addButton} onClick={handleClick}>
            +
          </div>
          <p>Create a new project</p>
        </div>
        <div>
          {data &&
            data.projects.map((el: any) => (
              <div key={String(el.project.id)}>
                <Link
                  href={{
                    pathname: '/dashboard',
                    query: { id: el.project.id },
                  }}
                >
                  <div className={styles.selectCard}>
                    <h2>{el.project.title}</h2>
                    <p>{el.project.description}</p>
                    <p>{el.project.status}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cryptr = new Cryptr(`${process.env.ENC_SECRET}`);

  console.log('yeeeees');

  const token = await cryptr.decrypt(`${context.query.token}`);

  console.log(token);
  const res = await fetch(`${process.env.BASEURL}/project/${token}`);

  const data = await res.json();

  console.log('thiiiis', data.projects);

  return { props: { data: data }, notFound: false };
};
