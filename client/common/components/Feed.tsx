import React, { useEffect, useState } from 'react';
import FeedItem from './../components/FeedItem';
import styles from '../../styles/Feed.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setFeed, updateFeed } from '../store/slices/feed/feed.slice';

const Feed = () => {

  const dispatch = useAppDispatch();
  const reduxFeedEvents = useAppSelector((state) => state.feed.feed);
  // const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchLatestFeeds();
  }, []);


  useEffect(() => {
    feedEvent();
  });

  const fetchLatestFeeds = async () => {
    const res = await fetch('https://ae99-45-130-134-153.eu.ngrok.io/feed/latest');

    const feed = await res.json();

    console.log('THE FEED', feed);

    dispatch(setFeed(feed));
  }


  const feedEvent = () => {
    const source = new EventSource('https://ae99-45-130-134-153.eu.ngrok.io/feed');

    source.addEventListener('message', (feed) => {
      const data = JSON.parse(feed.data);

      dispatch(updateFeed(data));

      source.close();
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h1>FEED</h1>
        {reduxFeedEvents.length ? (
          reduxFeedEvents.map((e: any) => {
            return <FeedItem feed={e} />;
          })
        ) : (
          <h3>No feed yet</h3>
        )}
      </div>
    </>
  );
}

export default Feed;
