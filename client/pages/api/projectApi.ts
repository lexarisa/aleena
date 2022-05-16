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
  console.log('data to be sent', data);
  console.log('hiitttt');
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    title: 'testinsdfgskjh;hjdfgdfg',
    description: 'testttt',
    status: 'To Do',
    user_id: 76721322,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  //@ts-ignore
  fetch('http://localhost:3001/project/', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

  // try {
  //   const response = await fetch(`http://localhost:3001/project/76721322`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // body: JSON.stringify(data),
  //   });
  //   console.log('res', response);
  //   if (!response.ok) {
  //     const message = `An error has occurred: ${response.status}`;
  //     throw new Error(message);
  //   }
  //   console.log(response.json());
  //   return response.json();
  // } catch (error) {
  //   console.error('error fetching', error);
  // }
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

export const updateProjectDetail = async (
  id: Number,
  projectData: IProject
) => {
  const response = await fetch(`${process.env.BASEURL}/project/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(projectData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
