import { Request, Response, NextFunction } from 'express';
import { DataService } from '../services/data.service';
import { Subject } from 'rxjs';

const service: DataService = new DataService();

export const newHookTask = new Subject();
export const newHookFeed = new Subject();

export const checkPR = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const pull_request = req.body;
    const pullId = pull_request.id;
    const status = pull_request.action;

    //find pr in db and update status
    let taskId = await service.updatePR(+pullId, status);

    if (taskId) {
      // update status of task if all PRs closed
      const allStatus = await service.getPRsInTask(+taskId);

      let updatedTask;

      if (allStatus?.githubs.every((git) => git.status === 'closed')) {
        updatedTask = await service.updateTaskStatus(+taskId, 'done');
      } else {
        updatedTask = await service.updateTaskStatus(+taskId, 'review');
      }

      updatedTask && newHookTask.next(updatedTask); // with db id
    }
    const feedUnit = await service.createFeed(pull_request);

    newHookFeed.next(feedUnit); // always send the pull req to feed

    next();
  } catch (error) {
    console.error(error);

    res.status(500);
  }
};
