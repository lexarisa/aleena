import { useState } from 'react';
import styles from '../../styles/Task.module.css';
import ITaskProps from '../types/ITaskProps';
import Tag from '../components/small/Tag';
import { updateTaskDetail, deleteTaskApi } from '../../pages/api/taskApi';
import Modal from './Modal';
import RoundButton from './small/RoundButton';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { deleteTask, setCurrentTask } from '../store/slices/task/task.slices';

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
      // tags: [selectedTag],
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

    <div className={styles.label}>
      <h2>Task Details</h2>
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
          <label className={styles.pr}>Link Your PR</label>
        </div>
        <div>
          <textarea
            value={pr}
            onChange={(e) => setPR(e.target.value)}
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
      <div className={styles.descriptionWrapper}>
        <div>
          <p className={styles.description}> {task.description}</p>
        </div>
      </div>
      <div>{task.comments}</div>
      <button onClick={() => handleUpdateTask()}>Save</button>

      <button onClick={() => handleDeleteTask()}>DELETE</button>
    </Modal>
  );
};

export default Task;
