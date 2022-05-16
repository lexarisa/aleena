import React, { useEffect, useState } from 'react';
import FeedItem from './../components/FeedItem';
import styles from '../../styles/Card.module.css';

function Feed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    feedEvent();
  });

  const feedEvent = () => {
    const source = new EventSource('http://localhost:3001/feed');

    source.addEventListener('message', (feed) => {
      setEvents((event: any[]): any => {
        const data = JSON.parse(feed.data);
        const oldFeed = event.filter((pr: any) => pr.pull_id !== data.pull_id);
        return [...oldFeed, data];
      });

      source.close();
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h1>FEEDsdfasdf</h1>
        {events.map((e) => {
          return <FeedItem event={e} />;
        })}
      </div>
    </>
  );
}

export default Feed;
