import Image from 'next/image';
import { addUserToProject } from '../../pages/api/projectApi';
import { useState } from 'react';
import { useRouter } from 'next/router';

//styling
import styles from '../../styles/Sidebar.module.css';
const SideBar = () => {
  const [showCollapsible, setShowCollapsible] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const router = useRouter();

  const handleShowCollapsible = () => {
    setShowCollapsible(!showCollapsible);
  };

  const handleAddUserToProject = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      try {
        const data = {
          username: searchUser,
          project_id: Number(router.query.id),
        };
        await addUserToProject(data);
        setSearchUser('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sideBarUp}>
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
      </div>
      <div className={styles.sideBarMid}>
        <section className={styles.collapsible}>
          <header>
            <div className={styles.header}>
              <h2 className={styles.title}>Teammates</h2>
              <span className={styles.dropDown}>+</span>
            </div>
          </header>
          <div className={styles.collapsible}>
            <div className={styles.collapsibleContent}>
              <input
                type="text"
                placeholder="Add your teammate..."
                className={styles.input}
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                onKeyDown={handleAddUserToProject}
              />
              <ul>
                <div className={styles.teammate}>
                  <div className={styles.avatar}>
                    <Image
                      src="https://github.com/thaiscosta.png"
                      width={40}
                      height={40}
                      alt="User profile image"
                    />
                  </div>
                  <span className={styles.text}>User 1</span>
                </div>
              </ul>
            </div>
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
            <ul className={styles.collapsibleContent}>
              <li className={styles.text}>Prj1</li>
              <li className={styles.text}>Prj2</li>
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
            <ul className={styles.collapsibleContent}>
              <li className={styles.text}>Doc1</li>
              <li className={styles.text}>Doc2</li>
            </ul>
          </div>
        </section>
      </div>
      <div className={styles.sideBarLower}>
        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
