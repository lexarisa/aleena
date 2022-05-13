import { prisma } from '../../../prisma/prisma-client';

export const getAllTasksInMilestoneQuery = async (milestoneId: number) => {
  const allTasks = await prisma.milestone.findMany({
    where: {
      id: milestoneId,
    },
    select: {
      tasks: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          deadline: true,
          milestone_id: true,
          user_id: true,
          tags: {
            select: {
              label: true,
              color: true,
            },
          },
        },
      },
    },
  });

  if (!allTasks) return null;
  return allTasks;
};

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

export const updateMilestoneQuery = async (
  title: string,
  milestone_id: number
) => {
  const milestone = await prisma.milestone.update({
    //
    where: {
      id: milestone_id,
    },
    data: {
      title: title,
    },
  });

  if (!milestone) throw new Error();

  return milestone;
};

export const deleteMilestoneQuery = async (milestone_id: number) => {
  const milestoneTasks = await prisma.task.deleteMany({
    where: {
      milestone_id: milestone_id,
    },
  });
  const milestoneDocument = await prisma.documentation.delete({
    where: {
      id: milestone_id,
    },
  });
  const milestone = await prisma.milestone.delete({
    where: {
      id: milestone_id,
    },
  });
  //
  if (!milestoneTasks) throw new Error();
  if (!milestone) throw new Error();

  return milestone;
};

export const findDashMilestonesQuery = async (project_id: number) => {
  const milestone = await prisma.milestone.findMany({
    where: {
      project_id: project_id,
    },
    take: 6,
    select: {
      id: true,
      title: true,
      status: true,
      tasks: {
        take: 2,
      },
    },
  });

  if (!milestone) throw new Error();

  return milestone;
};
