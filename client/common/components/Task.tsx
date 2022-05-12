import { useState } from 'react';
import styles from '../../styles/Task.module.css';
import ITaskProps from '../types/ITaskProps';
import Tag from '../components/small/Tag';

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
  // const source = new EventSource('http://localhost:3001/updateTasks');
  // source.addEventListener('message', (message) => {
  //   console.log('Data from server:', message);
  // });

  const [selectedStatus, setSelectedStatus] = useState(options[0].value);
  const [selectedTag, setSelectedTag] = useState(tags[0].label);
  const [description, setDescription] = useState('');

  const handleShowTask = () => {
    setShowTask(false);
  };

  //TODO make reusable button
  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <button onClick={handleShowTask} className={styles.button}>
          x
        </button>
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
                  <Tag />
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Task Detail</label>
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Deadline</label>
          </div>
          <div>
            <input type="datetime-local" />
          </div>
          <div>{task.users}</div>
        </div>
        <div>{task.description}</div>
        <div>{task.comments}</div>
      </div>
    </div>
  );
};

export default Task;
