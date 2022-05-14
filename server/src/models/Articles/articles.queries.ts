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

export const createArticleQuery = async (
  documentation_id: number,
  title: string,
  content: string
) => {
  const newDoc = await prisma.documentation.create({
    data: {
      title: title,
      content: content,
      milestone_id: documentation_id,
    },
  });
  if (!newDoc) return null;
  return newDoc;
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
