import type { NextPage } from 'next';
import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      <TabContainer>
        <h1>hello</h1>
      </TabContainer>
    </DashboardLayout>
  );
};

export default Home;
