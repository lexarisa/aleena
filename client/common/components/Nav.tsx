import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/nav.module.css';

const Nav = () => {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.navLinks}>Dashboard</a>
      </Link>
      <Link href="/board">
        <a className={styles.navLinks}>Board</a>
      </Link>
      <Link href="/document">
        <a className={styles.navLinks}>Document</a>
      </Link>
    </nav>
  );
};

export default Nav;
