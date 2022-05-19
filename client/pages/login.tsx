import React from 'react';
import Meta from '../common/components/Meta';
import Login from './../common/components/Login';
import Comment from '../common/components/Comment';

const LoginPage = () => {
  return (
    <div>
      <Meta
        title="Login to Aleena"
        keywords="Aleena"
        description="Productivity tool for developers"
      />
      <Login />
      {/* <Comment user="Arisa" description="hello" /> */}
    </div>
  );
};

export default LoginPage;
