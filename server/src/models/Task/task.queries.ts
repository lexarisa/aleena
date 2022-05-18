import { IUpdateTask } from './../../interfaces/ITask';
import { prisma } from '../../../prisma/prisma-client';

export const createTaskQuery = async (newTask: any) => {
  const task = await prisma.task.create({
    data: newTask,
    include: {
      githubs: true,
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

export const filterTasksPriorityQuery = 
async (project_id: number, filterPriority: string) => {
  const filterTaskPriority = await prisma.task.findMany({
    where: {
      project_id: project_id,
      priority: filterPriority,
    },
    include: {
      users: true,
      tags: true,
      comments: true,
      githubs: true,
    }
  });

  if(!filterTaskPriority) throw new Error();

  return filterTaskPriority;
}

export const filterTasksAssigneesQuery = 
async (project_id: number, filterAssignees: number) => {
  const filterTaskAssignees = await prisma.task.findMany({
    where: {
      project_id: project_id,
      users: {
        // @ts-ignore
        user_id: filterAssignees,
      }
    },
    include: {
      users: true,
      tags: true,
      comments: true,
      githubs: true,
    }
  });

  if(!filterTaskAssignees) throw new Error();

  return filterTaskAssignees;
}

export const filterTasksStatusQuery = 
async (project_id: number, filterStatus: string) => {
  const filterTaskStatus = await prisma.task.findMany({
    where: {
      project_id: project_id,
      status: filterStatus,
    },
    include: {
      users: true,
      tags: true,
      comments: true,
      githubs: true,
    }
  });

  if(!filterTaskStatus) throw new Error();

  return filterTaskStatus;
}

export const filterTasksTagsQuery = 
async (project_id: number, filterTags: number) => {
  const filterTaskTags = await prisma.task.findMany({
    where: {
      project_id: project_id,
      tags: {
        // @ts-ignore
        id: filterTags,
      },
    },
    include: {
      users: true,
      tags: true,
      comments: true,
      githubs: true,
    }
  });

  if(!filterTaskTags) throw new Error();

  return filterTaskTags;
}


export const filterTasksMilestoneQuery = 
async (project_id: number, filterMileIds: number) => {
  const filterTaskMilestone = await prisma.task.findMany({
    where: {
      project_id: project_id,
      milestone_id: filterMileIds,
    },
    include: {
      users: true,
      tags: true,
      comments: true,
      githubs: true,
    }
  });

  if(!filterTaskMilestone) throw new Error();

  return filterTaskMilestone;
}

