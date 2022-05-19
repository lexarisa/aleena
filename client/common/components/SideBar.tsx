import Image from 'next/image';
import { useCallback } from 'react';
import { addUserToProject } from '../../pages/api/projectApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import avatarPng from '../../../public/avatarPng.png';
import { useForm } from 'react-hook-form';

//styling
import styles from '../../styles/Sidebar.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import Link from 'next/link';
const SideBar = () => {
  const user_details = useAppSelector((state) => state.user.user_details);
  const allProjects = useAppSelector((state) => state.project.allProjects);
  const allUsersProject = useAppSelector((state) => state.project.allUsersInProject)

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
          <div className={styles.image}>
            <Image
              src={user_details.profile_pic}
              width={100}
              height={100}
              alt="User profile image"
            />
          </div>
          <div>
            <p className={styles.username}>{user_details.username}</p>
          </div>
        </div>

        <section className={styles.collapsible}>
          <header>
            <div id="profile" className={styles.header}>
              <h2 className={styles.title}>Your Profile</h2>
            </div>
          </header>
        </section>

        <section className={styles.collapsible}>
          <header>
            <div className={styles.header} id="teammates">
              <h2 className={styles.title}>Teammates</h2>
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
                {allUsersProject &&
                  allUsersProject.map((user: any) => {
                    return (
                      <div className={styles.userDetail} key={user.user.id}>
                        <div className={styles.avatar}>
                          <Image
                            src={user.user.profile_pic}
                            width={50}
                            height={30}
                            alt="User profile image"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="project" className={styles.header}>
              <h2 className={styles.title}>Your Projects</h2>
            </div>
          </header>
          <div className={styles.projectSections}>
            <ul className={styles.projectList}>
              {allProjects &&
                allProjects.map((pj: any) => {
                  return (
                    <Link
                      key={pj.id}
                      href={{
                        pathname: '/dashboard/[project_id]',
                        query: {
                          project_id: pj.id,
                        },
                      }}
                    >
                      <li className={styles.pj}>{pj.title}</li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="setting" className={styles.header}>
              <h2 className={styles.title}>Bookmarks</h2>
            </div>
          </header>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="setting" className={styles.header}>
              <h2 className={styles.title}>Settings</h2>
            </div>
          </header>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="setting" className={styles.header}>
              <h2 className={styles.title}>Help & Support</h2>
            </div>
          </header>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div id="setting" className={styles.header}>
              <h2 className={styles.title}>Contact</h2>
            </div>
          </header>
        </section>
      </div>
      <div className={styles.sideBarLower}>
        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
