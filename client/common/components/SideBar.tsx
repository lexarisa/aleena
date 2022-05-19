import Image from 'next/image';
import { useCallback } from 'react';
import { addUserToProject } from '../../pages/api/projectApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllUsersInProject } from '../../pages/api/user.api';
import avatarPng from '../../../public/avatarPng.png';

//styling
import styles from '../../styles/Sidebar.module.css';
import { useAppSelector } from '../store/hooks/redux-hooks';
import Link from 'next/link';
const SideBar = () => {

  const user_details = useAppSelector((state) => state.user.user_details)
  const allProjects = useAppSelector((state) => state.project.allProjects)

  const [showCollapsible, setShowCollapsible] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [allUsersInProject, setAllUsersInProject] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllUsersInProject(Number(router.query.id))
      .then((res) => setAllUsersInProject(res))
      .catch((err) => console.log(err));
  }, []);

  const handleShowCollapsible = () => {
    setShowCollapsible(!showCollapsible);
  };

  const handleAddUserToProject = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      try {
        console.log('running');
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
            src={user_details.profile_pic}
            width={80}
            height={80}
            alt="User profile image"
          />
          <div>
            <p className={styles.username}>{user_details.username}</p>
          </div>
        </div>

        <section className={styles.collapsible}>
          <header>
            <div
              className={styles.header}
              id="teammates"
              onClick={handleShowCollapsible}
            >
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

              <div className={styles.teammate}>
                {allUsersInProject.length > 0 &&
                  allUsersInProject.map((user) => {
                    console.log((user.id !== user_details.id))
                      return (
                        <div className={styles.userDetail} key={user.user.id}>
                          <div className={styles.avatar}>
                            <Image
                              src={user_details.profile_pic}
                              width={50}
                              height={30}
                              alt="User profile image"
                            />
                          </div>
                          <span className={styles.text}>
                            {user.user.username}
                          </span>
                        </div>
                      );
                  })}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="project" className={styles.header}>
              <h2 className={styles.title}>Project</h2>
              <span>+</span>
            </div>
          </header>
          <div className={styles.collapsible}>
            <ul className={styles.collapsibleContent}>
              {
                allProjects && allProjects.map((pj: any) => {
                  return (
                    <Link 
                    href={{
                      pathname: '/dashboard/[project_id]',
                      query: {
                        project_id: pj.id,
                      },
                    }}>
                      <li className={styles.text}>{pj.title}</li>
                    </Link>

                  )
                })
              }
            </ul>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div
              className={styles.header}
              id="bookmark"
              onClick={handleShowCollapsible}
            >
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
