import React from 'react';
import TabContainer from '../common/components/TabContainer';
import DashboardLayout from '../common/components/DashboardLayout';
import MainDashboard from '../common/components/MainDashBoard';
import { useRouter } from 'next/router';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <TabContainer>
        <MainDashboard />
      </TabContainer>
    </DashboardLayout>
  );
};

export default Dashboard;
