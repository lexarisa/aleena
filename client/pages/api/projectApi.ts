// };
import IProject from '../../common/types/IProject';

export const selectProject = async (id: number) => {
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/project/${id}`
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const project = await response.json();
  return project;
};

export const createProject = async (data: IProject) => {
  const response = await fetch(
    ` https://ae99-45-130-134-153.eu.ngrok.io/project`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const deleteProject = async (id: number) => {
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/project/${id}`,
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

export const updateProjectDetail = async (
  id: Number,
  projectData: IProject
) => {
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/project/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(projectData),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const addUserToProject = async (data: any) => {
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/projects`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
