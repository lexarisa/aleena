import { prisma } from '../../../prisma/prisma-client';

export const getAllArticlesInDocumentQuery = async (
  documentation_id: number
) => {
  const allArticles = await prisma.documentation.findMany({
    where: {
      id: documentation_id,
    },
    select: {
      articles: true,
    },
  });

  if (!allArticles) return null;
  return allArticles;
};
export const getArticleQuery = async (id: number) => {
  const article = await prisma.article.findUnique({
    where: {
      id: id,
    },
  });

  if (!article) return null;
  return article;
};

export const createArticleQuery = async (
  documentation_id: number,
  title: string,
  content: string
) => {
  const newArticle = await prisma.article.create({
    data: {
      documentation_id: documentation_id,
      title: title,
      content: content,
    },
  });
  if (!newArticle) return null;
  return newArticle;
};

export const updateArticleQuery = async (
  id: number,
  title: string,
  content: string
) => {
  // updating contents or title, should work for both
  const updatedArticle = await prisma.article.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });
  if (!updatedArticle) return null;
  return updatedArticle;
};
export const deleteArticleQuery = async (id: number) => {
  const deletedArticle = await prisma.article.delete({
    where: {
      id: id,
    },
  });
  if (!deletedArticle) return null;
  return deletedArticle;
};
