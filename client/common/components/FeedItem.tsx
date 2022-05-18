const FeedItem = ({feed}:any) => {
  return (
    <div>
      <div>#{feed.number}</div>
      <div>{feed.title}</div>
      <div>{feed.status}</div>
      <div>{feed.sender}</div>
      <div>{feed.pull_url}</div>
    </div>
  );
};

export default FeedItem;