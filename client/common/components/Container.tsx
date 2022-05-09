import React from 'react';
import Board from './Board';
import Nav from './Nav';
import TabContainer from './TabContainer';

//styling
import styles from '../../styles/Container.module.css';

function Container() {
  return (
    <div className={styles.container}>
      <TabContainer></TabContainer>
    </div>
  );
}

export default Container;
