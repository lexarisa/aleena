import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cryptr from 'cryptr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ITask from '../../common/types/ITask';
import CreateForm from '../../common/components/CreateForm';
import Modal from '../../common/components/Modal';
import styles from '../../styles/projectPage.module.css';

import { useAppDispatch, useAppSelector } from '../../common/store/hooks/redux-hooks';
import { setUser } from '../../common/store/slices/user/user.slice';
import { createProject, setProjects } from '../../common/store/slices/projects/project.slice';
import { store } from '../../common/store/index.store';

const project = ({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [showForm, setShowForm] = useState(false);
  
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.id);
  const allProjects = useAppSelector(state => state.project.allProjects)

  console.log(allProjects)
  useEffect(() => {
    streamProject();
  })

  const streamProject = () => {
    const sseProject = new EventSource('http://localhost:3001/project/sse');

    sseProject.addEventListener('message', (project) => {

      const data = JSON.parse(project.data)

      dispatch(createProject(data))

      console.log('chegou aqui tbm', allProjects)

      sseProject.close();
    });
  }

  const handleShowForm = () => {
    setShowForm(!showForm);
    dispatch(setUser(token));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          <div>
            <h1>Welcome to Alena, {data.username}</h1>
          </div>
          <div className={styles.selectCard} onClick={handleShowForm}>
            <div className={styles.addButton}>+</div>
            <p>Create a new project</p>
          </div>
          <div>
            {allProjects &&
              allProjects.map((el: any) => (
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
      <div>
        {showForm && (
          <Modal>
            <CreateForm setShowForm={setShowForm} token={token} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cryptr = new Cryptr(`${process.env.ENC_SECRET}`);

  const token = await cryptr.decrypt(`${context.query.token}`);

  const res = await fetch(`${process.env.BASEURL}/UserProjects/${token}`);

  const data = await res.json();


  store.dispatch(setProjects(data.projects));

  store.dispatch(setUser(token));

  return { props: { data: data, token }, notFound: false };
};
