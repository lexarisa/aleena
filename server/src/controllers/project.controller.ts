import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const selectProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const selectedProject = await prisma.project.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(selectedProject);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newProject = await prisma.project.create({ data: title });
    res.status(200).send(newProject);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    console.log('running');
    const { userId } = req.params; // pass with body or params?
    const allProjects = await prisma.user_Projects.findMany({
      where: {
        user_id: 1,
      },
    });
    res.status(200).send(allProjects);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deleteProject = await prisma.project.delete({
      where: {
        id,
      },
    });
    res.status(204).send(deleteProject);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { selectProject, createProject, deleteProject, getAllProjects };
