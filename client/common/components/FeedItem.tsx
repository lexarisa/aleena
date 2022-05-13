const FeedItem = ({event}:any) => {
  return (
    <div>
      <div>#{event.number}</div>
      <div>{event.title}</div>
      <div>{event.status}</div>
    </div>
  );
};

export default FeedItem;