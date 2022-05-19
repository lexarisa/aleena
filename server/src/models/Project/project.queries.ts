// import { IProject } from
import { prisma } from '../../../prisma/prisma-client';

export const createProjectQuery = async (newProject: any) => {
  const project = await prisma.user.create({
    data: newProject,
  });

  if (!project) throw new Error();

  return project;
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

export const findAllProjectsQuery = async (user_id: number) => {
  const project = await prisma.project.findMany({
    select: {
      user: {
        where: {
          id: user_id,
        },
      },
    },
  });

  if (project === null) return null;

  return project;
};

export const deleteProjectQuery = async (id: number) => {
  const project = await prisma.project.delete({
    where: {
      id,
    },
  });

  if (project === null) return null;

  return project;
};
