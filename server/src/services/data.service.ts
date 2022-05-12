import { PrismaClient } from '@prisma/client';

import { INewUser } from './../interfaces/user';

import {
  findProjectQuery,
  createProjectQuery,
  deleteProjectQuery,
} from '../models/Project/project.queries';
import {
  findUserQuery,
  createUserQuery,
  findUserProjectsQuery,
} from '../models/User/user.queries';
import { findDashboardQuery } from '../models/Dashboard/dashboard.queries';
import {
  createPRQuery,
  findPRQuery,
  closePRQuery,
  openPRQuery,
} from '../models/Github/github.queries';
import {
  createTaskQuery,
  findTaskQuery,
  findPRsInTask,
  updateTaskStatusQuery,
} from '../models/Task/task.queries';

// import { getTaskByPR } from '../models/Github/github.queries';

export class DataService {
  constructor(private prisma?: PrismaClient) {
    prisma = new PrismaClient();
  }

  getUser(id: number) {
    return findUserQuery(id);
  }

  createUser(user: INewUser) {
    return createUserQuery(user);
  }

  getProject(id: number) {
    return findProjectQuery(id);
  }

  getDashboard(project_id: number, user_id: number, page: number) {
    return findDashboardQuery(project_id, user_id, page);
  }
  getUserProjects(id: number) {
    return findUserProjectsQuery(id);
  }

  createProject(project: any) {
    return createProjectQuery(project);
  }

  deleteProject(id: number) {
    return deleteProjectQuery(id);
  }

  getTask(id: number) {
    return findTaskQuery(id);
  }

  createTask(newTask: any) {
    return createTaskQuery(newTask);
  }
  createPR(newPR: any) {
    return createPRQuery(newPR);
  }

  getPR(pull_id: number) {
    return findPRQuery(pull_id);
  }

  getPRsInTask(id: number) {
    return findPRsInTask(id);
  }

  closePR(pullId: number) {
    return closePRQuery(pullId);
  }
  openPR(pullId: number) {
    return openPRQuery(pullId);
  }
  updateTaskStatus(id: number) {
    return updateTaskStatusQuery(id);
  }
}
