import { prisma } from './../../../prisma/prisma-client';

export const createFeedQuery = async (feedUnit: any) => {
  const feedItem = await prisma.feed.create({
    data: feedUnit,
  });

  if (!feedItem) throw new Error();

  return feedItem;
};
