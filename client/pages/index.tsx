import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Main from 'next/document';
import Container from '../common/components/Container';
import DashboardLayout from '../common/components/DashboardLayout';

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      <Container />
    </DashboardLayout>
  );
};

export default Home;
