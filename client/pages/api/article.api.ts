import { INewArticle } from '../../common/types/INewArticle';

export const createArticle = async (data: INewArticle) => {
  console.log(data, 'data in createArticleAPI');
  const response = await fetch(`http://localhost:3001/article`, {
    // const response = await fetch(`${process.env.BASEURL}/article`, {
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

export const deleteArticle = async (article_id: number) => {
  console.log('article_id in api', article_id);
  const response = await fetch(`http://localhost:3001/article`, {
    // const response = await fetch(`${process.env.BASEURL}/article`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ article_id: article_id }), //article_id
  });
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
export const updateArticle = async (
  article_id: number,
  title: string,
  content: string
) => {
  const response = await fetch(`http://localhost:3001/article`, {
    // const response = await fetch(`${process.env.BASEURL}/article`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      article_id: article_id,
      title: title,
      content: content,
    }),
  });
  console.log('response', response);

  if (!response.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};
