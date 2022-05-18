// import { IProject } from
import { prisma } from '../../../prisma/prisma-client';

export const createProjectQuery = async (user_id: number, newProject: any, milesData: any) => {
  
    const project = await prisma.project.create({
      data: newProject,
    });

    if (milesData) {
      milesData = milesData.map((el: any) => {
        return {title: el.title, project_id: +project.id}
      })

      if (milesData.length > 1) {
        const milestones = await prisma.milestone.createMany({
          data: milesData
        });
      } else {
        const milestones = await prisma.milestone.create({
          data: milesData[0]
        });
      }
    }

    const projectUser = await prisma.user_Projects.create({
      data: {
        user_id: user_id,
        project_id: project.id,
      },
    });

    if (!projectUser) throw new Error();

    return project


  }


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

export const addUserToProjectQuery = async (
  username: string,
  project_id: number
) => {
  const userBeingAdded = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const projectAssigned = await prisma.user_Projects.create({
    //@ts-ignore :D
    data: {
      user_id: userBeingAdded?.id,
      project_id: project_id,
    },
  });

  return projectAssigned;

  // if (!projectAssigned) return projectAssigned;
};
