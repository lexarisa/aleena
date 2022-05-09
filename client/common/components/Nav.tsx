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
      <Link href="/">
        <a className={styles.navLinks}>Board</a>
      </Link>
    </nav>
  );
};

export default Nav;
