import React from 'react';
import styles from '../../styles/login.module.css';
// import { useSession, signOut } from 'next-auth/react';
import CustomButton from './small/CustomButton';
import { AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';

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
          <div className={styles.header}>
            <h1 className={styles.heading}>Log In to Aleena</h1>
            {/* <div className={styles.logo}>
              <Image src="/aleena.svg" width={50} height={50} />
            </div> */}
          </div>
          <div className={styles.login}>
            <button className={styles.github} onClick={handleSignIn}>
              <AiFillGithub className={styles.icon} />
              Login with Github
            </button>
            <button className={styles.signup} onClick={handleSignIn}>
              Signup with Github
            </button>

            <div className={styles.loginOption}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="text"
                placeholder="name@company.com"
                className={styles.input}
              />
              <CustomButton
                button="Continue"
                onClick={handleSignUp}
                color="#415a77"
                textColor="#f5f5f5"
              />
            </div>
            <p className={styles.notice}>Terms of Service and Privacy </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
