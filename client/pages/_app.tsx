import '../styles/globals.css';
import DashboardLayout from '../common/components/DashboardLayout';
import type { AppProps } from 'next/app';
import TaskProvider from '../common/context/task.context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <TaskProvider>
      <Component {...pageProps} />;
    </TaskProvider>
    </>
  );
}

export default MyApp;
