const pipePullRequest = (event: any) => {
  const targetEvents = ['opened', 'closed', 'ready_for_review'];
  if (targetEvents.includes(event.action)) {
    const pipedPull = {
      action: event.action,
      number: event.number,
      url: event.pull_request.url,
      title: event.pull_request.url,
      sender: event.sender.login,
      senderId: event.sender.id,
    };
    return pipedPull;
  }
};
