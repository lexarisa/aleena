export const streamTask = () => {
    const task = new EventSource('http://localhost:3001/tasks/sse');
    return task.addEventListener('message', (task) => {
      console.log('Data from SSE TASK:', task);
        return task.data
    });
}

export const feedEvent = () => {
    const source = new EventSource('http://localhost:3001/feed');

    source.addEventListener('feed', (feed) => {

    //   setEvents((event: any[]): any => {
    //     const data = JSON.parse(feed.data)
    //     const oldFeed = event.filter((pr: any) => pr.pull_id !== data.pull_id);
    //     return [...oldFeed, data]
    //   });

    });
}
