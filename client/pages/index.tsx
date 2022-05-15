import type { NextPage } from 'next';
import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';
import MainDashboard from '../common/components/MainDashBoard';
import Login from '../common/components/Login';

//TODO check page flow
const Home: NextPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Home;
