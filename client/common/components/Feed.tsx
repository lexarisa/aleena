import React, { useEffect, useState } from 'react';

function Feed() {
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   //fetch from db

  //   //SSE
  //   const sse = new EventSource('/feed');
  //   //on error
  //   sse.onerror = () => {
  //     console.log('server closed connection');
  //     sse.close();
  //   };

  //   function getRealtimeData(data) {
  //     // process the data here
  //     let newTask = data;
  //     // pass it to state to be rendered
  //     setTasks(() => [...tasks, newTask]);
  //   }
  //   sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
  //   sse.close();
  // }, []);
  const source = new EventSource('/feed');

  source.addEventListener('message', (message) => {
    console.log('Got', message);
  });

  return <div>Feed</div>;
}

export default Feed;
