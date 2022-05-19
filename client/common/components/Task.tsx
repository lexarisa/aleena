import { useState, useEffect } from 'react';
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
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { getAllComments } from '../../pages/api/commentApi';
import Link from 'next/link';
import Comment from './Comment';
import { setComments } from '../store/slices/comment/comment';
import { setTags } from '../store/slices/tag/tag.slice';
import FeedItem from './FeedItem';

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

const tags = [
  { labels: 'Bug', color: 'orange' },
  { labels: 'New Feature', color: 'green' },
  { labels: 'Strategy', color: 'yellow' },
  { labels: 'Duplicate', color: 'gray' },
  { labels: 'Help Wanted', color: 'red' },
  { labels: 'Question', color: 'purple' },
  { labels: 'Brainstorm', color: 'blue' },
];

const Task: React.FC<ITaskProps> = ({ setShowTask }) => {
  const dispatch = useAppDispatch();
  dispatch(setTags(tags));
  const user: any = useAppSelector((state) => state.user.user_details);
  const reduxTask: any = useAppSelector((state) => state.task.currentTask);
  const reduxCurrentProject: any = useAppSelector(
    (state) => state.project.currentProject
  );

  let initialLinkPR = reduxTask?.githubs[0]?.pull_url;
  if (initialLinkPR === undefined) initialLinkPR = '';

  const [githubLink, setGithubLink] = useState(initialLinkPR); // TODO !!! IF A TASK HAS MORE THAN ONE PR
  const [selectedStatus, setSelectedStatus] = useState(reduxTask.status);
  const [selectedPriority, setSelectedPriority] = useState(reduxTask.priority);
  const [selectedTag, setSelectedTag] = useState('');
  const [description, setDescription] = useState(reduxTask.description);
  const [comment, setComment] = useState('');
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const handleShowTask = () => {
    setShowTask(false);
    dispatch(setCurrentTask(null));
  };

  useEffect(() => {
    getAllComments(reduxTask.id).then((value) => setAllComments(value));
  }, []);
  // console.log('to create a task we need pj id', reduxCurrentProject);
  console.log('ALL', allComments);

  const handleUpdateTask = async (closePage: boolean) => {
    const dataToUpdate = {
      user_id: Number(user.id),
      project_id: Number(reduxCurrentProject.id),
      status: selectedStatus,
      priority: selectedTag,
      description: description,
      comments: {
        user_id: Number(user.id),
        task_id: Number(reduxTask.id),
        description: comment,
      },
      tags: selectedTag,
    };

    await updateTaskDetail(reduxTask.id as Number, dataToUpdate);
    if (githubLink !== '') {
      await linkPRTask(githubLink, reduxTask.id);
    }
    setGithubLink(initialLinkPR);
    setShowTask(closePage);
  };

  const handleShowUpdateTask = () => {
    setShowUpdateTask(!showUpdateTask);
  };
  const handleDeleteTask = async () => {
    const deleted = await deleteTaskApi(reduxTask.id as Number);
    setShowTask(false);
  };

  return (
    <Modal>
      <div className={styles.close} onClick={handleShowTask}>
        <AiOutlineClose className={styles.icon} />
      </div>

      <div className={styles.detail}>
        <h1>{reduxTask.title}</h1>

        <div onClick={handleShowUpdateTask} className={styles.editButton}>
          <AiOutlineEdit />
          Edit
        </div>

        <div
          className={styles.collapsible}
          style={showUpdateTask ? { display: 'flex' } : { display: 'none' }}
        >
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
                {tags.map((tag: any) => (
                  <option
                    key={tag.labels}
                    value={tag.labels}
                    className={styles.options}
                  >
                    {tag.labels}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label}>Priority</label>
            </div>
            <div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
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
            <div className={styles.updateButton}>
              <CustomButton
                button="Save"
                textColor="#fff"
                color="#415a77"
                onClick={() => handleUpdateTask(false)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.descriptionWrapper}>
          <div>
            <p className={styles.label}>Your Task Detail:</p>
            <p className={styles.description}>{reduxTask.description}</p>
            <div>{reduxTask.users}</div>
          </div>
        </div>

        <div className={styles.comment}>
          <div className={styles.userImage}>
            <Image
              src={user.profile_pic}
              width={50}
              height={50}
              alt="User profile image"
            />
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            className={styles.input}
            value={comment}
            onChange={(e) => setComment(e.target.value)}

            // onSubmit={() => handleUpdateTask(true)}
          />
        </div>

        <div>
          <div>
            {allComments &&
              allComments.map((comment, index) => {
                return (
                  <div key={index}>
                    <Comment comment={comment} />
                  </div>
                );
              })}
            {/* {reduxTask.comments.length > 0
              ? reduxTask.comments.map((el: any) => {
                  console.log('task!!!!!!!!!', reduxTask);
                  return (
                    <div key={el.id}>
                      <Comment description={el.description} />
                    </div>
                  );
                })
              : ''} */}
          </div>
        </div>
      </div>
      <div>
        <div>
          {reduxTask.githubs && reduxTask.githubs.map((pr: any) => {
                console.log('PR', pr);
                return (
                  <>
                  <div className={styles.pr}>  
                    <p className={styles.text}>#{pr.number}  {pr.title}</p>
                    <Link href={`${pr.repo_url}/pulls/${pr.number}`}>
                    <a style={{color:'white'}} target="_blank">{pr.repo_url}/pulls/{pr.number}</a>
                    </Link>
                    <br></br>
                    </div>
                  </>
                );
              })}
        </div>
      </div>
    </Modal>
  );
};

export default Task;
