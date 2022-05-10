import '../styles/globals.css';
import DashboardLayout from '../common/components/DashboardLayout';
import type { AppProps } from 'next/app';
import Login from '../common/components/Login';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Login></Login>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
