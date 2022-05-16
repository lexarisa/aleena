import React, { useState, useEffect } from 'react';
import styles from '../../styles/projectPage.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ITask from '../../common/types/ITask';
import Link from 'next/link';
import Cryptr from 'cryptr';
import CreateForm from '../../common/components/CreateForm';
import Modal from '../../common/components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectApi, setProjects } from '../../redux/features/projectSlice';

const project = ({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    streamProject();
  });
  dispatch(setProjects(data.projects));

  const streamProject = () => {
    const projectSse = new EventSource('http://localhost:3001/projects/sse');

    projectSse.addEventListener('message', (prj) => {
      const newProject = JSON.parse(prj.data);

      const old = projects.filter(
        (oldProject: any) => oldProject.project.id !== newProject.id
      );

      console.log([...old, newProject]);
      dispatch(setProjects([...old, newProject]));

      projectSse.close();
    });
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          <h1>Welcome to Alena, {data.username}</h1>
          <div className={styles.selectCard} onClick={handleShowForm}>
            <span className={styles.addButton}>+</span>

            <p>Create a new project</p>
          </div>
          <div className={styles.projectSection}>
            {projects.map((el: any) => (
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

  // const token = await cryptr.decrypt(`${context.query.token}`);

  const token = context.query.token;
  const res = await fetch(`${process.env.BASEURL}/project/${token}
  `);

  const data = await res.json();

  return { props: { data: data, token }, notFound: false };
};
