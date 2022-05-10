import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getMainDashboard = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const dashboard = await prisma.project.findMany({
      where: {
        user: userId,
      },
    });
    res.json(dashboard);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getMainDashboard };
