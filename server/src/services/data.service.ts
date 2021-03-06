import { PrismaClient } from '@prisma/client';
import { INewUser } from './../interfaces/user';
import { IComment } from './../interfaces/IComment';

import {
  findProjectQuery,
  createProjectQuery,
  deleteProjectQuery,
  findUserProjectsQuery,
  addUserToProjectQuery,
} from '../models/Project/project.queries';

import {
  findUserQuery,
  createUserQuery,
  getAllBookmarksQuery,
  createBookmarkQuery,
  deleteBookmarkQuery,
  findAllUsersInProjectQuery,
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
  deleteTaskQuery,
  filterTasksTagsQuery,
  filterTasksStatusQuery,
  filterTasksMilestoneQuery,
  filterTasksAssigneesQuery,
  filterTasksPriorityQuery,
} from '../models/Task/task.queries';

import {
  createOrUpdateFeedQuery,
  findLatestFeedsQuery,
} from '../models/Feed/feed.queries';

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
  getDocumentationQuery,
  getAllDocumentsInProjectQuery,
} from '../models/Documentation/documentation.queries';

import {
  getAllArticlesInDocumentQuery,
  getArticleQuery,
  createArticleQuery,
  updateArticleQuery,
  deleteArticleQuery,
} from '../models/Articles/articles.queries';

import { getAllTasksInMilestoneQuery } from '../models/Milestone/milestone.queries';
import {
  addCommentQuery,
  getAllCommentsQuery,
  deleteCommentQuery,
} from '../models/Comment/comment.queries';
import { cleanFilter } from './../utils/cleanFilter';

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
  findAllUsersInProject(project_id: number) {
    return findAllUsersInProjectQuery(project_id);
  }

  getProject(id: number) {
    return findProjectQuery(id);
  }

  async getDashboard(
    project_id: number,
    user_id: number,
    page: number
  ): Promise<any[]> {
    const allStatus = ['To Do', 'In Progress', 'Review', 'Done', 'Backlog'];

    return await Promise.all(
      allStatus.map(async (status: string): Promise<any> => {
        return await findDashboardQuery(project_id, user_id, page, status);
      })
    );
  }

  getUserProjects(id: number) {
    return findUserProjectsQuery(id);
  }
  getUserBookmarks(id: number) {
    return getAllBookmarksQuery(id);
  }
  createBookmarks(id: number, article_id: number) {
    return createBookmarkQuery(id, article_id);
  }
  deleteBookmarks(user_id: number, article_id: number) {
    return deleteBookmarkQuery(user_id, article_id);
  }

  createProject(user_id: number, newProject: any, milestones: any) {
    return createProjectQuery(user_id, newProject, milestones);
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

  deleteTask(task_id: number) {
    return deleteTaskQuery(task_id);
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
  getDocumentation(id: number) {
    return getDocumentationQuery(id);
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
    return getAllDocsInMilestoneQuery(+milestone_id);
  }
  getArticle(id: number) {
    return getArticleQuery(+id);
  }
  createArticle(document_id: number, title: string, content: string) {
    return createArticleQuery(document_id, title, content);
  }
  updateArticle(id: number, title: string, content: string) {
    return updateArticleQuery(id, title, content);
  }
  deleteArticle(id: number) {
    return deleteArticleQuery(id);
  }
  getAllArticlesInDocument(document_id: number) {
    return getAllArticlesInDocumentQuery(document_id);
  }
  addUserToProject(username: string, project_id: number) {
    return addUserToProjectQuery(username, project_id);
  }

  getAllDocumentsInProject(project_id: number) {
    return getAllDocumentsInProjectQuery(project_id);
  }

  addComment(comment: IComment) {
    console.log('service', comment);
    return addCommentQuery(comment);
  }
  getAllComments(task_id: number) {
    return getAllCommentsQuery(task_id);
  }

  deleteComment(comment_id: number) {
    return deleteCommentQuery(comment_id);
  }
  getLatestFeeds() {
    return findLatestFeedsQuery();
  }

  async filterTasks(
    project_id: number,
    filterPriority: string[],
    filterStatus: string[],
    filterMileIds: number[],
    filterAssignees: number[],
    filterTags: string[]
  ): Promise<any[]> {
    const allFilteredTasks: any = [];
    // const conditions = [project_id, filterPriority, filterStatus,filterMileIds,filterAssignees,filterTags]

    if (filterPriority) {
      const priorities = await Promise.all(
        filterPriority.map(async (priority: string): Promise<any> => {
          return await filterTasksPriorityQuery(project_id, priority);
        })
      );

      const cleanPriority = cleanFilter(
        priorities,
        project_id,
        filterPriority,
        filterStatus,
        filterMileIds,
        filterAssignees,
        filterTags
      );

      allFilteredTasks.push(cleanPriority);
    }

    if (filterStatus) {
      const status = await Promise.all(
        filterStatus.map(async (status: string): Promise<any> => {
          return await filterTasksStatusQuery(project_id, status);
        })
      );

      // console.log('heeeere', status);
      const cleanStatus = cleanFilter(
        status,
        project_id,
        filterPriority,
        filterStatus,
        filterMileIds,
        filterAssignees,
        filterTags
      );

      allFilteredTasks.push(cleanStatus);
    }

    if (filterAssignees) {
      const assignees = await Promise.all(
        filterAssignees.map(async (assignee: number): Promise<any> => {
          return await filterTasksAssigneesQuery(project_id, assignee);
        })
      );

      // console.log('heeeere', assignees);
      const cleanAssignees = cleanFilter(
        assignees,
        project_id,
        filterPriority,
        filterStatus,
        filterMileIds,
        filterAssignees,
        filterTags
      );

      allFilteredTasks.push(cleanAssignees);
    }

    if (filterMileIds) {
      const milestones = await Promise.all(
        filterMileIds.map(async (milestone: number): Promise<any> => {
          return await filterTasksMilestoneQuery(project_id, milestone);
        })
      );

      // console.log('heeeere', milestones);
      const cleanMilestones = cleanFilter(
        milestones,
        project_id,
        filterPriority,
        filterStatus,
        filterMileIds,
        filterAssignees,
        filterTags
      );

      allFilteredTasks.push(cleanMilestones);
    }

    if (filterTags) {
      const tags = await Promise.all(
        filterTags.map(async (tag: string): Promise<any> => {
          return await filterTasksTagsQuery(project_id, tag);
        })
      );
      // console.log('heeeere', tags);
      const cleanTags = cleanFilter(
        tags,
        project_id,
        filterPriority,
        filterStatus,
        filterMileIds,
        filterAssignees,
        filterTags
      );

      allFilteredTasks.push(cleanTags);
    }

    return allFilteredTasks;
  }
}
