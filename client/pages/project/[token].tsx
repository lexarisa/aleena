import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cryptr from 'cryptr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ITask from '../../common/types/ITask';
import CreateForm from '../../common/components/CreateForm';
import Modal from '../../common/components/Modal';
import styles from '../../styles/projectPage.module.css';

import {
  useAppDispatch,
  useAppSelector,
} from '../../common/store/hooks/redux-hooks';
import { setUser, setUserDetails } from '../../common/store/slices/user/user.slice';
import {
  updateProjects,
  setProjects,
  deleteProject,
  setCurrentProject,
} from '../../common/store/slices/projects/project.slice';
import { store } from '../../common/store/index.store';
import { AiOutlinePlus } from 'react-icons/ai';

const project = ({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const user = useAppSelector(state => state.user.id);
  const reduxAllProjects = useAppSelector((state) => state.project.allProjects);

  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  console.log(reduxAllProjects);

  useEffect(() => {
    fetchProjects();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    streamProject();
  });

  const fetchUserDetails = async () => {
    const res = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/user-details/${token}`
    );

    const data = await res.json();

    dispatch(setUserDetails(data))
  }

  const fetchProjects = async () => {
    const res = await fetch(
      `https://ae99-45-130-134-153.eu.ngrok.io/UserProjects/${token}`
    );

    const data = await res.json();

    const projects = data.projects;

    const formatProjects = formatData(projects, 'project');

    dispatch(setProjects(formatProjects));

    dispatch(setUser(token));
  };

  const streamProject = () => {
    const sseProject = new EventSource(
      'https://ae99-45-130-134-153.eu.ngrok.io/project/sse'
    );

    sseProject.addEventListener('message', (project) => {
      const event = JSON.parse(project.data).event;
      const newProject = JSON.parse(project.data).data;

      if (newProject.user.some((el: any) => el.user_id === token)) {
        if (event === 'create') {
          dispatch(updateProjects(newProject));
        }
  
        if (event === 'delete') {
          dispatch(deleteProject(newProject));
        }
      }

      sseProject.close();
    });
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleProjectSelect = (pj: any) => {
    dispatch(setCurrentProject(pj));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          <h1 className={styles.header}>
            Welcome to Aleena {reduxAllProjects.username}
          </h1>
          <button className={styles.addButton} onClick={handleShowForm}>
            New Project
            <AiOutlinePlus className={styles.icon} />
          </button>
        </div>
        <div className={styles.projects}>
          {reduxAllProjects &&
            reduxAllProjects.map((project: any) => (
              <div key={String(project.id)} className={styles.project}>
                <Link
                  href={{
                    pathname: '/dashboard',
                    query: { id: project.id },
                  }}
                >
                  <div
                    onClick={() => handleProjectSelect(project)}
                    className={styles.projectDetail}
                  >
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {showForm && (
        <Modal>
          <CreateForm setShowForm={setShowForm} token={token} />
        </Modal>
      )}
    </>
  );
};

export default project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cryptr = new Cryptr(`${process.env.ENC_SECRET}`);

  const token = await cryptr.decrypt(`${context.query.token}`);

  return { props: { token }, notFound: false };
};

export const formatData = (data: any, title: string) => {
  const format: any[] = [];

  data.forEach((element: any) => {
    format.push(element[title]);
  });

  return format;
};
