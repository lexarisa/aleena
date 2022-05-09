import Image from 'next/image';

//styling
import styles from '../../styles/Sidebar.module.css';
function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.userImage}>
        <Image
          src="https://github.com/thaiscosta.png"
          width={300}
          height={300}
          alt="User profile image"
        />
      </div>
      <div className={styles.sideBar}>
        <ul>
          <li>Home</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
