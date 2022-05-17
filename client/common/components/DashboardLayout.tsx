import SideBar from './SideBar';
import Layout from './Layout';
import Feed from './Feed';

type DashBoardLayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const DashboardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <Layout>
      <SideBar />
      <div>{children}</div>
      <Feed />
    </Layout>
  );
};

export default DashboardLayout;
