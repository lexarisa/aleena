import React from 'react';
import Meta from '../common/components/Meta';
import Login from './../common/components/Login';

const LoginPage = () => {
  return (
    <div>
      <Meta
        title="Login to Aleena"
        keywords="Aleena"
        description="Productivity tool for developers"
      />
      <Login />
    </div>
  );
};

export default LoginPage;
