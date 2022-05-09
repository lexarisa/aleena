import { connected } from 'process';
import React, { useEffect, useState } from 'react';

function Feed() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    //fetch from db

    //SSE
    const sse = new EventSource('SSE_URL');
    //on error
    sse.onerror = () => {
      console.log('server closed connection');
      sse.close();
    };

    function getRealtimeData(data) {
      // process the data here
      let newTask = data;
      // pass it to state to be rendered
      setTasks(() => [...tasks, newTask]);
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.close();
  }, []);

  return <div>Feed</div>;
}

export default Feed;

app.get('/feed', (req, res) => {
  console.log('client connected');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');

  //send data
  res.write(`data:${'data to send'}\n`);
  res.on('close', () => {
    console.log('client closed connection');
    res.end();
  });
});
