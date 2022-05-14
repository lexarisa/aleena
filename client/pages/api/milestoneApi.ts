import { INewMilestone } from '../../common/types/INewMilistone';

export const createMilestone = async (data: INewMilestone) => {
  const response = await fetch(`http://localhost:3001/milestone`, {
    // const response = await fetch(`${process.env.BASEURL}/milestone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};

export const deleteMilestone = async (milestone_id: number) => {
  console.log('milestone_id in api', milestone_id);
  const response = await fetch(`http://localhost:3001/milestone`, {
    // const response = await fetch(`${process.env.BASEURL}/milestone`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ milestone_id: milestone_id }), //milestone_id
  });
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
export const updateMilestone = async (title: string, milestone_id: number) => {
  const response = await fetch(`http://localhost:3001/milestone`, {
    // const response = await fetch(`${process.env.BASEURL}/milestone`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title, milestone_id: milestone_id }), //milestone_id
  });
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
