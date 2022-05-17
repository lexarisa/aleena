// import { IProject } from
import { prisma } from '../../../prisma/prisma-client';

export const createProjectQuery = async (user_id: number, newProject: any) => {
  const project = await prisma.project.create({
    data: newProject,
  });

  if (!project) throw new Error();

  const projectUser = await prisma.user_Projects.create({
    data: {
      user_id: user_id,
      project_id: project.id
    },
  });

  if (!projectUser) throw new Error();

  return project;
};

export const findUserProjectsQuery = async (id: number) => {
  const projects = await prisma.user.findUnique({
    //do we want only one?
    where: {
      id,
    },
    include: {
      projects: {
        select: {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              deadline: true,
            },
          },
        },
      },
    },
  });

  if (!projects) return null;

  return projects;
};

// export const createProjectQuery = async (newProject: any) => {
//   console.log('newwww', newProject);
//   const project = await prisma.project.create({
//     data: {
//       title: newProject.title,
//       description: newProject.description,
//       status: newProject.status,
//       user: {
//         create: [{ user: { connect: { id: newProject.id } } }],
//       },
//     },
//   });
//   if (!project) throw new Error();
//   return project;
// };

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
