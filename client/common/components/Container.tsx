import React from 'react';
import SideBar from './SideBar';
import Board from './Board';
import Nav from './Nav';
import TabContainer from './TabContainer';

//styling
import styles from '../../styles/Container.module.css';

function Container() {
  return (
    <div className={styles.container}>
      <Nav />
      <TabContainer>
        <Board />
      </TabContainer>
    </div>
  );
}

export default Container;
