// import { IProject } from
import { prisma } from '../../../prisma/prisma-client';

export const createProjectQuery = async () => {
  // const userData = await prisma.user.create({
  //     data
  // });
};

export const findProjectQuery = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (project === null) return null;

  return project;
};
