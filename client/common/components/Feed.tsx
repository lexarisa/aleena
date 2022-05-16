import React, { useEffect, useState } from 'react';
import FeedItem from './../components/FeedItem';
import styles from '../../styles/Card.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { updateFeed } from '../store/slices/feed/feed.slice';

function Feed() {
  
  const dispatch = useAppDispatch()
  const reduxFeedEvents = useAppSelector(state => state.feed.feed)
  // const [events, setEvents] = useState([]);
 
  useEffect(() => {
    feedEvent();
  })

  const feedEvent = () => {
    const source = new EventSource('http://localhost:3001/feed');

    source.addEventListener('message', (feed) => {

      const data = JSON.parse(feed.data)

      dispatch(updateFeed(data))

      source.close();
    });
  }

  return (
    <>
    <div className={styles.container}>
    <h1>FEED</h1>
      {reduxFeedEvents ? reduxFeedEvents.map((e:any) => {
        return <FeedItem event={e}/>;
      }) : <h3>No feed yet</h3>}
    </div>
    </>
  );
}

export default Feed;

