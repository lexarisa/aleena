import React, { useState, useEffect } from 'react';
import styles from '../../styles/projectPage.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ITask from '../../common/types/ITask';
import Link from 'next/link';
import Cryptr from 'cryptr';
import CreateForm from '../../common/components/CreateForm';
import Modal from '../../common/components/Modal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../common/store/hooks/redux-hooks';
import { setUser } from '../../common/store/slices/user/user.slice';

const project = ({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.id);

  const handleShowForm = () => {
    setShowForm(!showForm);
    dispatch(setUser(token));
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
  console.log(data);

  return { props: { data: data, token }, notFound: false };
};
