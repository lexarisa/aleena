import React from 'react';
import SideBar from './SideBar';
import Board from './Board';

//styling
import styles from '../../styles/Container.module.css';

function Container() {
  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <Board></Board>
    </div>
  );
}

export default Container;
