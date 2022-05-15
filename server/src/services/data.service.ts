import { PrismaClient } from '@prisma/client';
import { INewUser } from './../interfaces/user';
// import { Service } from 'typedi';

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

import { createOrUpdateFeedQuery } from '../models/Feed/feed.queries';

import {
  createMilestoneQuery,
  findDashMilestonesQuery,
  updateMilestoneQuery,
  deleteMilestoneQuery,
} from '../models/Milestone/milestone.queries';

import {
  createDocumentationQuery,
  updateDocumentationQuery,
  deleteDocumentationQuery,
  getAllDocsInMilestoneQuery,
} from '../models/Documentation/documentation.queries';

import {
  getAllArticlesInDocumentQuery,
  createArticleQuery,
  updateArticleQuery,
  deleteArticleQuery,
} from '../models/Articles/articles.queries';

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

  async getDashboard(project_id: number, user_id: number, page: number): Promise<any[]> {

    const allStatus = ['To Do','In Progress','Review','Done','Backlog'];

    return await Promise.all(
      allStatus.map(
        async (status: string): Promise<any> => {

        return await findDashboardQuery(project_id, user_id, page, status);
    }));
    
  // getDashboard(
  //   project_id: number,
  //   user_id: number,
  //   page: number,
  //   status: string
  // ) {
  //   return findDashboardQuery(project_id, user_id, page, status);
  }

  getUserProjects(id: number) {
    return findUserProjectsQuery(id);
  }

  createProject(user_id: number, project: any) {
    return createProjectQuery(user_id, project);
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

  async findAndUpdatePR(pull_id: number, status: string) {
    const pull = await findPRQuery(pull_id);
    if (pull !== null) {
      return updatePRQuery(pull_id, status);
    } else {
      return null;
    }
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

  createOrUpdateFeed(feedUnit: any) {
    return createOrUpdateFeedQuery(feedUnit);
  }

  getAllTasksInMilestone(id: number) {
    return getAllTasksInMilestoneQuery(id);
  }
  updateMilestone(title: string, milestone_id: number) {
    return updateMilestoneQuery(title, milestone_id);
  }
  deleteMilestone(milestone_id: number) {
    return deleteMilestoneQuery(milestone_id);
  }
  createDocumentation(title: string, milestone_id: number) {
    return createDocumentationQuery(title, milestone_id);
  }
  updateDocumentation(title: string, id: number) {
    return updateDocumentationQuery(title, id);
  }
  deleteDocumentation(id: number) {
    return deleteDocumentationQuery(id);
  }
  getAllDocsInMilestone(milestone_id: number) {
    return getAllDocsInMilestoneQuery(milestone_id);
  }
  createArticle(title: string, content: string, document_id: number) {
    return createArticleQuery(document_id, title, content);
  }
  updateArticle(title: string, content: string, id: number) {
    return updateArticleQuery(id, title, content);
  }
  deleteArticle(id: number) {
    return deleteArticleQuery(id);
  }
  getAllArticlesInDocument(document_id: number) {
    return getAllArticlesInDocumentQuery(document_id);
  }
}
