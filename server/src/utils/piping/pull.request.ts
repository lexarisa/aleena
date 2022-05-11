import { Subject } from 'rxjs';

export const newLog = new Subject();

export const cleanPullRequest = (event: any) => {
  if (event.action === 'created' || event.action === 'open' ||
  event.action === 'reopened' || event.action === 'closed') {
    const pullEvent = {
      action: event.action,
      number: event.number,
      pullUrl: event.pull_request.url,
      title: event.pull_request.url,
      sender: event.sender.login,
      senderId: event.sender.id,
      comment: event.body,
      repoUrl: event.repository.html_url,
    };
    console.log(' a pull ',pullEvent)
    
    newLog.next(pullEvent);
    return pullEvent; // send it to in-progress
  }
  return 'Sorry xuxu';
};

// {url} Pull request {action} by {sender} ,{number} {title} {comments} {repoUrl}
