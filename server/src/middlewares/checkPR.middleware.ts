import { Request, Response, NextFunction } from 'express';

import { Subject } from 'rxjs';
export const newHook = new Subject();
export const newLog = new Subject();

import { DataService } from '../services/data.service'; //check db

const service: DataService = new DataService();

export const checkPR = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const pull_request = req.body;
  try {
    const pullId = pull_request.id;
    const status = pull_request.action;

    //find pr in db and update status
    let taskId = await service.updatePR(+pullId, status);

    if (taskId) {
      // update status of task if all PRs closed
      const allStatus = await service.getPRsInTask(+taskId);
      let updatedTask;

      if (allStatus?.githubs.every((s) => s.status === 'closed')) {
        updatedTask = await service.updateTaskStatus(+taskId, 'done');
      } else {
        updatedTask = await service.updateTaskStatus(+taskId, 'review');
      }
      updatedTask && newHook.next(updatedTask); // with db id
    }

    const feedUnit = await service.createFeed(pull_request); //TODO
    newLog.next(feedUnit); // always send the pull req to feed
    next();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
