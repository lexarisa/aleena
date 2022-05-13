import { prisma } from './../../../prisma/prisma-client';

export const createOrUpdateFeedQuery = async (feedUnit: any) => {
  const feedItem = await prisma.feed.upsert({
    where: {
      pull_id: feedUnit.pull_id,
    },
    update: feedUnit,
    create: feedUnit,
  });

  if (!feedItem) throw new Error();

  return feedItem;
};
