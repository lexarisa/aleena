import React from 'react';
import styles from '../styles/login.module.css';

const login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form action=" ">
          <div className={styles.logo}>Alena</div>
          <h1 className={styles.header}>Login</h1>
          <button className={styles.github}>Log in with Github</button>
        </form>
      </div>
    </div>
  );
};

export default login;
