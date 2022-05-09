import React from 'react';
import Board from '../common/components/Board';
import DashboardLayout from '../common/components/DashboardLayout';
import TabContainer from '../common/components/TabContainer';

const board = () => {
  return (
    <DashboardLayout>
      <TabContainer>
        <Board />
      </TabContainer>
    </DashboardLayout>
  );
};

export default board;
