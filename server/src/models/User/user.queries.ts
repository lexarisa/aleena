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

export const createBookmarkQuery = async (
  article_id: number,
  user_id: number
) => {
  console.log('hit bookmark query');
  const bookmarkedArticle = await prisma.user.update({
    where: {
      id: 2,
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
export const deleteBookmarkQuery = async (
  article_id: number,
  user_id: number
) => {
  const unBookmarkedArticle = await prisma.user.update({
    where: {
      id: user_id,
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
