import { prisma } from '../../../prisma/prisma-client';

export const findAllTasksInMileStoneQuery = async (mileStoneId: number) => {
  const allTasks = await prisma.milestone.findMany({
    where: {},
  });
};
