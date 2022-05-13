import { PrismaClient } from '@prisma/client';
import { INewUser } from './../interfaces/user';
import { Service } from 'typedi';

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
  updatePRQuery,
} from '../models/Github/github.queries';

import {
  createTaskQuery,
  findTaskQuery,
  findPRsInTask,
  updateTaskStatusQuery,
  updateTaskDetailQuery,
} from '../models/Task/task.queries';

import {
  createMilestoneQuery,
  findDashMilestonesQuery,
} from '../models/Milestone/milestone.queries';
import { createFeedQuery } from '../models/Feed/feed.queries';
import { getAllTasksInMilestoneQuery } from '../models/Milestone/milestone.queries';

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

  updateTaskDetail(id: number, updateTaskData: any) {
    return updateTaskDetailQuery(id, updateTaskData);
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

  updatePR(pullId: number, status: string) {
    return updatePRQuery(pullId, status);
  }

  updateTaskStatus(id: number, status: string) {
    return updateTaskStatusQuery(id, status);
  }

  createMilestone(title: string, project_id: number) {
    return createMilestoneQuery(title, project_id);
  }

  getDashMilestones(project_id: number) {
    return findDashMilestonesQuery(project_id);
  }

  createFeed(feedUnit: any) {
    return createFeedQuery(feedUnit);
  }

  getAllTasksInMilestone(id: number) {
    return getAllTasksInMilestoneQuery(id);
  }
}
