import Image from 'next/image';

//styling
import styles from '../../styles/Sidebar.module.css';
function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.userImage}>
        <Image
          src="https://github.com/thaiscosta.png"
          width={80}
          height={80}
          alt="User profile image"
        />
        <div>
          <p className={styles.username}>username</p>
        </div>
      </div>
      <div className={styles.sideBarMid}>
        <section className={styles.collapsible}>
          <header>
            <div className={styles.header}>
              <h2 className={styles.title}>Teammates</h2>
              <span>+</span>
            </div>
          </header>
          <div className={styles.collapsible}>
            <ul>
              <li>User1</li>
              <li>User2</li>
            </ul>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div className={styles.header}>
              <h2 className={styles.title}>Project</h2>
              <span>+</span>
            </div>
          </header>
          <div className={styles.collapsible}>
            <ul>
              <li>Prj1</li>
              <li>Prj2</li>
            </ul>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div className={styles.header}>
              <h2 className={styles.title}>Bookmarked</h2>
              <span>+</span>
            </div>
          </header>
          <div className={styles.collapsible}>
            <ul>
              <li>Doc1</li>
              <li>Doc2</li>
            </ul>
          </div>
        </section>
      </div>
      <div className={styles.sideBarLower}>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
