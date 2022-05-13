import { INewMilestone } from '../../common/types/IMilestone';

export const createMilestone = async (data: INewMilestone) => {
  const response = await fetch(`http://localhost:3001/milestone`, {
    // console.log(process.env.NEXT_PUBLIC_BASEURL);
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/milestone`, {
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
  const milestone = await response.json();
  return milestone;
};
