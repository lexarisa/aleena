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
            </div>
          </header>
          <div className={styles.collapsible}>
            <ul className={styles.collapsibleContent}>
              {allProjects &&
                allProjects.map((pj: any) => {
                  return (
                    <Link
                      href={{
                        pathname: '/dashboard/[project_id]',
                        query: {
                          project_id: pj.id,
                        },
                      }}
                    >
                      <li className={styles.text}>{pj.title}</li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </section>
        <section className={styles.collapsible}>
          <header>
            <div className={styles.header} id="bookmark">
              <h2 className={styles.title}>Bookmarked</h2>
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
