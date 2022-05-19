import SideBar from './SideBar';
import Layout from './Layout';

type DashBoardLayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const DashboardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <Layout>
      <SideBar />
      <div>{children}</div>
    </Layout>
  );
};

export default DashboardLayout;
