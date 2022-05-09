import React from 'react';
import DashBoard from './Dashboard';
import SideBar from './SideBar';
import Nav from './Nav';
import Board from './Board';
import Layout from './Layout';

type DashBoardLayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const DashboardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <Layout>
      <SideBar />
      <Nav />
      <Board />
    </Layout>
  );
};

export default DashboardLayout;
