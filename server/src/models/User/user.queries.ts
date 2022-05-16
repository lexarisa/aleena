import { IUser, INewUser } from '../../interfaces/user';
import { prisma } from '../../../prisma/prisma-client';

export const createUserQuery = async (newUser: INewUser) => {
  const userData = await prisma.user.create({
    data: newUser,
  });

  if (!userData) throw new Error();

  return userData;
};

export const findUserQuery = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) return null;

  return user;
};

export const findUserProjectsQuery = async (id: number) => {
  const projects = await prisma.user.findUnique({
    //do we want only one?
    where: {
      id,
    },
    include: {
      projects: {
        select: {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              deadline: true,
            },
          },
        },
      },
    },
  });

  if (!projects) return null;

  return projects;
};
export const getAllBookmarksQuery = async (id: number) => {
  const bookmarkedArticles = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      articles: true,
    },
  });
  if (!bookmarkedArticles) return null;
  return bookmarkedArticles;
};

export const createBookmarkQuery = async (id: number, article_id: number) => {
  const bookmarkedArticle = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      articles: {
        connect: {
          id: article_id,
        },
      },
    },
  });
  if (!bookmarkedArticle) return null;
  return bookmarkedArticle;
};
export const deleteBookmarkQuery = async (id: number, article_id: number) => {
  const unBookmarkedArticle = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      articles: {
        disconnect: {
          id: article_id,
        },
      },
    },
  });
  if (!unBookmarkedArticle) return null;
  return unBookmarkedArticle;
};
