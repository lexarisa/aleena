import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const selectProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selectedProject = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(selectedProject);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { selectProject };
