export const getComments = async () => {
  const response = await fetch(`${process.env.BASEURL}/comments`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const comments = await response.json();
  return comments;
};

export const addComment = async (comment) => {
  //TODO add type
  const response = await fetch(`${process.env.BASEURL}/comments`, {
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

export const deleteComment = async (id: number) => {
  const response = await fetch(`${process.env.BASEURL}/comment/${id}`, {
    method: 'DELETE',
  });
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
