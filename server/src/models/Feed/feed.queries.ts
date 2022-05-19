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

export const findLatestFeedsQuery = async () => {
  const latestFeeds = await prisma.feed.findMany({
    take: 20,
    orderBy: {
      created_at: 'desc'
        
    },
    select: {
      id: true,
      sender: true,
      repo_url: true,
      title: true,
      status: true,
      number: true,
      pull_url: true,
      comment: true,
    }
  })

  if (!latestFeeds) throw new Error();

  return latestFeeds;
}