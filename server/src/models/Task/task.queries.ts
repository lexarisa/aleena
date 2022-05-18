import { IUpdateTask } from './../../interfaces/ITask';
import { prisma } from '../../../prisma/prisma-client';

export const createTaskQuery = async (newTask: any) => {
  const task = await prisma.task.create({
    data: newTask,
    include: {
      githubs: true
    }
  });

  if (!task) throw new Error();

  return task;
};

export const findTaskQuery = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
    include: {
      githubs: true,
      comments: true,
      users: true,
      tags: true,
    },
  });

  if (!task) return null;

  return task;
};

export const findPRsInTask = async (id: number) => {
  const status = await prisma.task.findUnique({
    where: {
      id: id,
    },
    select: {
      githubs: {
        select: {
          status: true,
        },
      },
    },
  });

  if (!status) return null;

  return status;
};

export const updateTaskStatusQuery = async (id: number, status: string) => {
  const task = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  if (!task) return null;

  return task;
};

export const updateTaskDetailQuery = async (
  id: number,
  updateTaskData: IUpdateTask
) => {
  const task = await prisma.task.update({
    where: {
      id: id,
    },
    // @ts-ignore
    data: updateTaskData,
  });

  if (!task) return null;

  return task;
};

export const deleteTaskQuery = async (id: number) => {
  const task = await prisma.task.delete({
    where: {
      id
    }
  });

  if(!task) throw new Error();

  return task;
}