import { useState } from 'react';
import styles from '../../styles/Task.module.css';
import ITaskProps from '../types/ITaskProps';
import Tag from '../components/small/Tag';
import { updateTaskDetail, deleteTaskApi } from '../../pages/api/taskApi';
import { linkPRTask } from '../../pages/api/taskApi';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import CustomButton from './small/CustomButton';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { deleteTask, setCurrentTask } from '../store/slices/task/task.slices';
import Image from 'next/image';

const options = [
  { value: 'To Do' },
  { value: 'In Progress' },
  { value: 'Review' },
  { value: 'Done' },
  { value: 'Backlog' },
];

const priority = [
  { labels: 'High', color: 'red' },
  { labels: 'Medium', color: 'yellow' },
  { labels: 'Low', color: 'white' },
  { labels: 'none', color: 'transparent' },
];
const Task: React.FC<ITaskProps> = ({ setShowTask }) => {
  const dispatch = useAppDispatch();

  const user: any = useAppSelector(state => state.user.id)
  const reduxTask: any  = useAppSelector(state => state.task.currentTask)
  const reduxCurrentProject: any  = useAppSelector(state => state.project.currentProject)

  console.log('reduxTask', reduxTask)

  let initialLinkPR = reduxTask.githubs[0]?.pull_url
  if (initialLinkPR === undefined) initialLinkPR = '';

  const [githubLink, setGithubLink] = useState(initialLinkPR); // TODO !!! IF A TASK HAS MORE THAN ONE PR
  const [selectedStatus, setSelectedStatus] = useState(reduxTask.status);
  const [selectedTag, setSelectedTag] = useState(reduxTask.priority);
  const [description, setDescription] = useState(reduxTask.description);
  const [pr, setPR] = useState('');


  const handleShowTask = () => {
    setShowTask(false);
    dispatch(setCurrentTask(null));
  };

  console.log('to create a task we need pj id',reduxCurrentProject)
  const handleUpdateTask = async () => {
    const dataToUpdate = {
      user_id: Number(user),
      project_id: Number(reduxCurrentProject.id),
      status: selectedStatus,
      priority: selectedTag,
      description: description,
    };

    await updateTaskDetail(reduxTask.id as Number, dataToUpdate);
    await linkPRTask(githubLink, reduxTask.id);
    setShowTask(false);
  };

  const handleDeleteTask = async () => {
    const deleted = await deleteTaskApi(reduxTask.id as Number);
    setShowTask(false);
  };
  //TODO make reusable button
  return (
    <Modal>
      <div className={styles.wrapper}></div>
      <div className={styles.close}>
        <RoundButton
          button="x"
          onClick={handleShowTask}
          color="#fff"
          textColor="#333"
        />
      </div>
      <div className={styles.detail}>
        <h1>{reduxTask.title}</h1>
        <div className={styles.headerSection}>
          <div>
            <label className={styles.label}>Status</label>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Tags</label>
          </div>
          <div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {priority.map((priority) => (
                <option
                  key={priority.labels}
                  value={priority.labels}
                  className={styles.options}
                >
                  {priority.labels}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Task Detail</label>
          </div>
          <div>
            <textarea
              className={styles.textarea}
              value={description}
              placeholder="Add Detail..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Github Repository</label>
          </div>
          <div>
            <input
              type="url"
              className={styles.textarea}
              value={githubLink}
              placeholder="Add a link to github repository"
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Due</label>
          </div>
          <div>
            <input type="datetime-local" className={styles.textarea} />
          </div>
          <div>{reduxTask.users}</div>
        </div>
        <div className={styles.descriptionWrapper}>
          <div>
            <p className={styles.description}> {reduxTask.description}</p>
          </div>
        </div>
        <div>{reduxTask.comments}</div>
        <CustomButton
          button="Save"
          textColor="#fff"
          color="#415a77"
          onClick={() => handleUpdateTask()}
        />
        <div className={styles.comment}>
          <div className={styles.userImage}>
            <Image
              src="https://github.com/thaiscosta.png"
              width={50}
              height={50}
              alt="User profile image"
            />
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className={styles.input}
          />
        </div>
      </div>

      <div>
        <div>
          {reduxTask.githubs.length > 0 ? reduxTask.githubs.map((pr:any) => {
          return (
            <>
              <h3>#{pr.number}</h3>
              <h3>{pr.title}</h3>
              <h3>{pr.pull_url}</h3>
              <h3>{pr.status}</h3>
            </>
          )
        }) : []};
        </div>
      </div>
    </Modal>
  );
};

export default Task;

//  <div className={styles.label}>
{
  /* <h2>Task Details</h2>
<h3>{reduxTask.title}</h3>
<h3>{reduxTask.status}</h3>
<h3>{reduxTask.description}</h3>
<h3>{JSON.stringify(reduxTask)}</h3>
</div>

<RoundButton
  button="x"
  onClick={handleShowTask}
  color="#333"
  textColor="#fff"
/>

<h1>{task.title}</h1>
<div className={styles.headerSection}>
  <div>
    <label className={styles.label}>Status</label>
  </div>
  <div>
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className={styles.label}>Priority</label>
  </div>
  <div>
    <select
      value={selectedTag}
      onChange={(e) => setSelectedTag(e.target.value)}
    >
      {priority.map((priority) => (
        <option
          key={priority.labels}
          value={priority.labels}
          className={styles.options}
        >
          {priority.labels}
        </option>
      ))}
    </select> */
}
