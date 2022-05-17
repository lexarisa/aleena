import { useState } from 'react';
import styles from '../../styles/Task.module.css';
import ITaskProps from '../types/ITaskProps';
import Tag from '../components/small/Tag';
import { updateTaskDetail, deleteTaskApi } from '../../pages/api/taskApi';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { deleteTask, setCurrentTask } from '../store/slices/task/task.slices';
import Image from 'next/image';
import CustomButton from './small/CustomButton';

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
  const user = useAppSelector(state => state.user.id)
  const reduxTask = useAppSelector(state => state.task.currentTask)

  console.log('reduxTask', reduxTask)

  const [githubLink, setGithubLink] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(reduxTask.status);
  const [selectedTag, setSelectedTag] = useState(reduxTask.priority);
  const [description, setDescription] = useState(reduxTask.description);
  const [pr, setPR] = useState('');

  const handleShowTask = () => {
    setShowTask(false);
    dispatch(setCurrentTask(null))
  };

  const handleUpdateTask = async () => {
    const dataToUpdate = {
      user_id: user,
      project_id: 1,
      status: selectedStatus,
      tags: [selectedTag],
      description: description,
    };

    await updateTaskDetail(reduxTask.id as Number, dataToUpdate);
    setShowTask(false);
  };


  const handleDeleteTask = async () => {
    const deleted = await deleteTaskApi(reduxTask.id as Number)
    setShowTask(false);
  }
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
    </Modal>
  );
};

export default Task;
