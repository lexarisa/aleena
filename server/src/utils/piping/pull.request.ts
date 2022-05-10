export const pipePullRequest = (event: any) => {
  if (event.action === 'created' || event.action === 'closed') {
    console.log('EVENT ACTION', event.action);
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
  return {};
};

// {url} Pull request {action} by {sender} ,{number} {title} {comments} {repoUrl}
