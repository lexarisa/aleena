import { prisma } from '../../../prisma/prisma-client';

export const createMilestoneQuery = async (
  title: string,
  project_id: number
) => {
  const milestone = await prisma.milestone.create({
    data: {
      project_id: project_id,
      title: title,
    },
  });

  if (!milestone) throw new Error();

  return milestone;
};
