import React from 'react';
import styles from '../../styles/Login.module.css';
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
      <div className={styles.container}>
        <div className={styles.form}>
          {/* <form action=" ">
    //       <div className={styles.logo}>Alena</div>
    //       <h1 className={styles.header}>Login</h1>
    //       <button className={styles.github}>Log in with Github</button>
    //     </form> */}
        </div>
      </div>

      <button onClick={handleSignIn}>Login with Github</button>
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
