import React from 'react';
import styles from '../../styles/Login.module.css';
// import { useSession, signOut } from 'next-auth/react';
import CustomButton from './small/CustomButton';

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
        <div className={styles.cardWrapper}>
          <div>
            <h1>Login to Alena</h1>
          </div>
          <div className={styles.login}>
            <CustomButton
              button="Login with Github"
              onClick={handleSignIn}
              color="#415a77"
              textColor="#fff"
            />
            <CustomButton
              button="Sign Up"
              onClick={handleSignUp}
              color="#e0e1dd"
              textColor="#191919"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
