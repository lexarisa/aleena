import ITask from '../../common/types/ITask';

export const createNewTask = async (task) => {
  const response = await fetch(`http://localhost:3001/task`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getSingleTask = async (id: string) => {
  const response = await fetch(`${process.env.BASEURL}/${id}`);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};
