import { prisma } from '../../../prisma/prisma-client';

export const getAllDocsInMilestoneQuery = async (milestoneId: number) => {
  const allDocs = await prisma.milestone.findMany({
    where: {
      id: milestoneId,
    },
    select: {
      documents: {
        select: {
          id: true,
          milestone_id: true,
          title: true,
        },
      },
    },
  });

  if (!allDocs) return null;
  return allDocs;
};
