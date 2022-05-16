import { useState } from 'react';
import styles from '../../styles/Task.module.css';
import ITaskProps from '../types/ITaskProps';
import Tag from '../components/small/Tag';
import { updateTaskDetail } from '../../pages/api/taskApi';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import CustomButton from './small/CustomButton';
import Image from 'next/image';

const options = [
  { value: 'To Do' },
  { value: 'In Progress' },
  { value: 'Review' },
  { value: 'Done' },
  { value: 'Backlog' },
];

const tags = [
  { label: 'High Priority', color: 'red' },
  { label: 'Low Priority', color: 'yellow' },
];
const Task: React.FC<ITaskProps> = ({ setShowTask, task }) => {
  const source = new EventSource('http://localhost:3001/updateTasks');
  source.addEventListener('message', (message) => {
    console.log('Data from server:', message);
  });

  const [selectedStatus, setSelectedStatus] = useState(options[0].value);
  const [selectedTag, setSelectedTag] = useState(tags[0].label);
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');

  const handleShowTask = () => {
    setShowTask(false);
  };

  const handleUpdateTask = async () => {
    const dataToUpdate = {
      user_id: 1,
      project_id: 1,
      status: selectedStatus,
      // tags: [selectedTag],
      description: description,
    };

    await updateTaskDetail(task.id as Number, dataToUpdate);
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
            <label className={styles.label}>Tags</label>
          </div>
          <div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option
                  key={tag.label}
                  value={tag.label}
                  className={styles.options}
                >
                  {tag.label}
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
          <div>{task.users}</div>
        </div>
        <div className={styles.descriptionWrapper}>
          <div>
            <p className={styles.description}> {task.description}</p>
          </div>
        </div>
        <div>{task.comments}</div>
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
