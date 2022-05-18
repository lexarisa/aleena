import styles from '../../styles/FeedItem.module.css';
import { AiOutlineGithub, AiOutlineUser } from 'react-icons/ai';
const FeedItem = ({ feed }: any) => {
  const statusColor =
    feed.status === 'closed' ? styles.closedStatus : styles.greenStatus;
  return (
    <div className={styles.container}>
      <div className={styles.issue}>
        <div className={styles.github}>
          <AiOutlineGithub /> #{feed.number}
        </div>
        <div className={styles.status + ' ' + statusColor}>
          <span>{feed.status} </span>
        </div>
      </div>

      <p className={styles.title}>{feed.title}</p>
      <div className={styles.sender}>
        <AiOutlineUser /> {feed.sender}
      </div>
      <div className={styles.url}>{feed.pull_url}</div>
    </div>
  );
};

export default FeedItem;
