import React from 'react';
// import { useSession, signOut } from 'next-auth/react';
import path from 'path';

const Login = () => {
  // const { data, status } = useSession()

  const handleSignIn = async () => {
    await window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  };

  const handleSignUp = async () => {
    await window.location.assign(
      'https://github.com/apps/aleena-app/installations/new?state=AB12t'
    );
  };

  // const handleLogout = async () => {
  //   await signOut({
  //     callbackUrl: 'http://localhost:3000/',
  //   })
  // }

  return (
    <>
      <h1>Hello Urze</h1>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};

// export const getStaticProps = () => {
//   return {
//     props: {
//       client_id: process.env.GITHUB_CLIENT_ID,
//       client_secret: process.env.GITHUB_CLIENT_SECRET,
//     }
//   }
// }

export default Login;
