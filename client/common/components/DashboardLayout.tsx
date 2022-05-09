import SideBar from './SideBar';
import Layout from './Layout';
import Container from './Container';

type DashBoardLayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const DashboardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <Layout>
      <SideBar />
      <Container />
    </Layout>
  );
};

export default DashboardLayout;
