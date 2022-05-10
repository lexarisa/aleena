import React, { useEffect, useState } from 'react';

function Feed() {
  // const [events, setEvents] = useState(['first event']);

  // useEffect(()=>{}) -> LOAD FEED FROM DB

  const source = new EventSource('http://localhost:3001/feed');
  // useEffect(() => {
  source.addEventListener('message', (message) => {
    console.log('Data from server:', message);
  });
  // }, []);

  return (
    <div>
      <button
        onClick={() => {
          source.close();
        }}
      >
        close
      </button>
    </div>
  );
}

export default Feed;
