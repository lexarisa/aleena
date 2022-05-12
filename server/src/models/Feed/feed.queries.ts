import { prisma } from '../../../prisma/prisma-client';

export const createFeedQuery = async (log: any) => {
  const feedItem = await prisma.feed.create({
    data: {
      log,
    },
  });

  if (!feedItem) throw new Error();

  return feedItem;
};
