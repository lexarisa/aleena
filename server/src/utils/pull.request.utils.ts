// import { Subject } from 'rxjs';

// export const newLog = new Subject();

export const cleanPullRequest = (event: any) => {
  if (
    event.action === 'open' ||
    event.action === 'reopened' ||
    event.action === 'closed'
  ) {
    const pullEvent = {
      id: event.pull_request.id,
      action: event.action,
      title: event.pull_request.title,
      sender: event.sender.login,
      senderId: event.sender.id,
      repoUrl: event.repository.html_url,
      number: event.number,
      pull_url: event.pull_request.url,
      comment: event.pull_request.body,
    };

    // newLog.next(pullEvent);
    return pullEvent;
  }
  return null;
};

// {url} Pull request {action} by {sender} ,{number} {title} {comments} {repoUrl}
