// };
import IProject from '../../common/types/IProject';

export const selectProject = async (id: number) => {
  const response = await fetch(`${process.env.BASEURL}/project/${id}`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const project = await response.json();
  return project;
};

export const createProject = async (data: IProject) => {
  const response = await fetch(`${process.env.BASEURL}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const deleteProject = async (id: number) => {
  const response = await fetch(`${process.env.BASEURL}/project/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};