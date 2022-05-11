import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const createNewTask = async (req: Request, res: Response) => {
  try {
    const {
      id,
      created_at,
      title,
      description,
      status,
      deadline,
      user_id,
      project_id,
      milestone_id,
    } = req.body;
    const taskDetail = {
      id,
      created_at,
      title,
      description,
      status,
      deadline,
      user_id,
      project_id,
      milestone_id,
    };
    const task = await prisma.task.create({ data: taskDetail });

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findSingleTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { createNewTask, findSingleTask };
