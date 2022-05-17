import ITask from '../../common/types/ITask';

export const createNewTask = async (task: ITask) => {
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

export const linkPRTask = async (pr_url: string, task_id: number) => {
  const splitPR = pr_url.split('/');
  const lastIndex = splitPR.length - 1;

  const response = await fetch(
    `${process.env.PR_API_URL}/${splitPR[lastIndex - 3]}/${
      splitPR[lastIndex - 2]
    }/pulls/${splitPR[lastIndex]}`
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();

  const newPR = {
    task_id: task_id,
    pull_id: data.id,
    title: data.title,
    status: data.state,
    number: data.number,
    pull_url: data.url,
    comment: data.body,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPR),
  };

  const sendPR = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/github/PR`,
    options
  );

  return await sendPR.json();
};

export const updateTaskDetail = async (id: Number, taskData: ITask) => {
  const response = await fetch(`http://localhost:3001/task/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(taskData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const deleteTaskApi = async (id: Number) => {
  const response = await fetch(`http://localhost:3001/task/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
