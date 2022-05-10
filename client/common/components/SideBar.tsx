import Image from 'next/image';

//styling
import styles from '../../styles/Sidebar.module.css';
function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.userImage}>
        <Image
          src="https://github.com/thaiscosta.png"
          width={100}
          height={100}
          alt="User profile image"
        />
      </div>
      <div className={styles.sideBar}>
        <ul className={styles.links}>
          <li>Home</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
