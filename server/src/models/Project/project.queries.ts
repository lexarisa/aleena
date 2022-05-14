// import { IProject } from
import { prisma } from '../../../prisma/prisma-client';

// export const createProjectQuery = async (user_id: number, newProject: any) => {
//   console.log('yes');

//   const project = await prisma.project.create({
//     data: newProject,
//   });

//   if (!project) throw new Error();

//   const projectUser = await prisma.user_Projects.create({
//     data: {
//       user_id: user_id,
//       project_id: project.id,
//     },
//   });

//   if (!projectUser) throw new Error();

//   return projectUser;
// };

export const createProjectQuery = async (newProject: any) => {
  const project = await prisma.project.create({
    data: {
      title: newProject.title,
      description: newProject.description,
      status: newProject.status,
      user: {
        connect: {
          id: newProject.user_id,
        },
      },
    },
  });
  if (!project) throw new Error();
  return project;
};

export const getProjectQuery = async (id: number) => {
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
