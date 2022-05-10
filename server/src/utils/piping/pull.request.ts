const pipePullRequest = (event: any) => {
  if (event.action === 'created') {
    const pullEvent = {
      action: event.action,
      number: event.number,
      pullUrl: event.pull_request.url,
      title: event.pull_request.url,
      sender: event.sender.login,
      senderId: event.sender.id,
      comment: event.body,
      repoUrl: event.repo.url,
    };
    return pullEvent; // send it to in-progress
  }
  // if (event.action === 'closed') {
  //   const pullClosed = {
  //     action: event.action,
  //     number: event.number,
  //     pullUrl: event.pull_request.url,
  //     title: event.pull_request.url,
  //     sender: event.sender.login,
  //     senderId: event.sender.id,
  //   };
  //   return pullClosed; // send it to done
  // }
};
module.exports = pipePullRequest;
// {url} Pull request {action} by {sender} ,{number} {title} {comments} {repoUrl}
