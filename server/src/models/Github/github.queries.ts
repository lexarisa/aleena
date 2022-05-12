import { prisma } from '../../../prisma/prisma-client';
export const findPRQuery = async (pull_id: number) => {
  const taskId = await prisma.github.findUnique({
    where: {
      pull_id,
    },
    select: {
      task_id: true,
    },
  });
  if (!taskId) return null;

  return taskId;
};

export const createPRQuery = async (newPR: any) => {
  const pr = await prisma.github.create({
    data: newPR,
  });

  if (!pr) return null;
  
  return pr;
};

export const updatePRQuery = async (pull_id: number, status: string) => {
  const taskId = await prisma.github.update({
    where: {
      pull_id,
    },
    data: {
      status: status,
    },
    select: {
      task_id: true,
    },
  });

  if (!taskId) return null;

  return taskId;
};
