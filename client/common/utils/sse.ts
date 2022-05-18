export const streamTask = () => {
    const task = new EventSource('https://ae99-45-130-134-153.eu.ngrok.io/tasks/sse');
    return task.addEventListener('message', (task) => {
      console.log('Data from SSE TASK:', task);
        return task.data
    });
}

export const feedEvent = () => {
    const source = new EventSource('https://ae99-45-130-134-153.eu.ngrok.io/feed');

    source.addEventListener('feed', (feed) => {

    //   setEvents((event: any[]): any => {
    //     const data = JSON.parse(feed.data)
    //     const oldFeed = event.filter((pr: any) => pr.pull_id !== data.pull_id);
    //     return [...oldFeed, data]
    //   });

    });
}
