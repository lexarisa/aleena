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

export const getAllBookmarksQuery = async (user_id: number) => {
  const bookmarkedArticles = await prisma.user_Articles.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      article: true,
    },
    // select: {
    //   id: true,
    //   article: true,
    //   user: true,
    // },
  });
  if (!bookmarkedArticles) return null;
  return bookmarkedArticles;
};

export const createBookmarkQuery = async (
  article_id: number,
  user_id: number
) => {
  console.log('in create bookmark query a. id and u id', article_id, user_id);
  const bookmarkedArticle = await prisma.user_Articles.create({
    data: {
      article_id: article_id,
      user_id: user_id,
    },
    select: {
      // id: true,
      article: true,
    },
  });
  if (!bookmarkedArticle) return null;
  return bookmarkedArticle;
};
export const deleteBookmarkQuery = async (
  user_id: number,
  article_id: number
) => {
  const unBookmarkedArticleId = await prisma.user_Articles.findFirst({
    where: {
      user_id: user_id,
      article_id: article_id,
    },
    select: {
      id: true,
    },
  });

  console.log('ID', unBookmarkedArticleId.id);

  const unBookmarkedArticle = await prisma.user_Articles.delete({
    where: {
      id: +unBookmarkedArticleId.id,
    },
  });

  if (!unBookmarkedArticle) return null;
  return unBookmarkedArticle;
};

export const findAllUsersInProjectQuery = async (project_id: number) => {
  const allUsers = await prisma.user_Projects.findMany({
    where: {
      project_id,
    },
    select: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          profile_pic: true,
        },
      },
    },
  });
  if (!allUsers) return null;
  return allUsers;
};
