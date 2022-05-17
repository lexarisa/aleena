export const getTags = async () => {
  const response = await fetch(`${process.env.BASEURL}/tags`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const tags = await response.json();
  return tags;
};

export const addTag = async (tag) => {
  //TODO add type
  const response = await fetch(`${process.env.BASEURL}/tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const deleteTag = async (id: number) => {
  const response = await fetch(`${process.env.BASEURL}/tag/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const updateTag = async (id: Number, newTag: any) => {
  //TODO add type
  const response = await fetch(`${process.env.BASEURL}/tag/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(newTag),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
