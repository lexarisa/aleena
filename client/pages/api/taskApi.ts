import ITask from '../../common/types/ITask';

export const createNewTask = async (task: string) => {
  console.log('task', task);
  console.log('process', process.env.BASEURL);
  const response = await fetch(`${process.env.BASEURL}/task`, {
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
