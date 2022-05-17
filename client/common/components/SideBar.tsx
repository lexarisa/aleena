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
        <p>username</p>
      </div>
      <section className={styles.collapsible}>
        <header>
          <div>
            <h2>Teammates</h2>
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
          <div>
            <h2>Project</h2>
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
          <div>
            <h2>Bookmarked</h2>
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
      <div>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
