import IComment from '../../common/types/IComment';

export const getAllComments = async (task_id: number) => {
  const response = await fetch(`${process.env.BASEURL}/comments/${task_id}`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const comments = await response.json();
  return comments;
};

export const addComment = async (comment: IComment) => {
  //TODO add type
  const response = await fetch(`${process.env.BASEURL}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const deleteComment = async (comment_id: number) => {
  const response = await fetch(
    `${process.env.BASEURL}/comments/${comment_id}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const updateComment = async (id: Number, commentDetail: any) => {
  //TODO add type
  const response = await fetch(`${process.env.BASEURL}/comment/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(commentDetail),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
