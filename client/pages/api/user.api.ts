export const getAllUsersInProject = async (project_id: number) => {
  const response = await fetch(`${process.env.BASEURL}/users/${project_id}`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const allUsersInProject = await response.json();
  return allUsersInProject;
};
