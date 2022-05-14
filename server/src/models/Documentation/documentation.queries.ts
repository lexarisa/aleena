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

export const createDocumentationQuery = async (
  title: string,
  milestone_id: number
) => {
  const newDoc = await prisma.documentation.create({
    data: {
      title: title,
      milestone_id: milestone_id,
    },
  });
  if (!newDoc) return null;
  return newDoc;
};
