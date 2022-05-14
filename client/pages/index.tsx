import type { NextPage } from 'next';

import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';
import MainDashboard from '../common/components/MainDashBoard';
import { wrapper } from '../store/index.store';

const Home: NextPage = () => {
  return (
    <>
      <DashboardLayout>
        <TabContainer>
          <MainDashboard />
        </TabContainer>
      </DashboardLayout>
    </>
  );
};



export default Home;
