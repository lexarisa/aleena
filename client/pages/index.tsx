import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Board from '../common/components/Board';

const Home: NextPage = () => {
  return (
    <div style={styles}>
      <h1>hello</h1>
      {/* <Board></Board> */}
    </div>
  );
};

export default Home;
