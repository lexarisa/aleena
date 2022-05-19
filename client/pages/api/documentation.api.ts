import { INewDocumentation } from '../../common/types/INewDocumentation';

export const createDocumentation = async (data: INewDocumentation) => {
  console.log(data, 'data in createDocAPI');
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/documentation`,
    {
      // const response = await fetch(`${process.env.BASEURL}/doc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};

export const deleteDocumentation = async (id: number) => {
  console.log(id, 'data in deleteDocAPI');
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/documentation`,
    {
      // const response = await fetch(`${process.env.BASEURL}/article`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    }
  );
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
export const updateDocumentation = async (
  documentation_id: number,
  title: string,
  content: string
) => {
  const response = await fetch(
    `https://ae99-45-130-134-153.eu.ngrok.io/documentation`,
    {
      // const response = await fetch(`${process.env.BASEURL}/documentation`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentation_id: documentation_id,
        title: title,
        content: content,
      }),
    }
  );
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
