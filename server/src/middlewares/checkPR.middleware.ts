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
    const pull_id = pull_request.pull_id;
    const status = pull_request.status;

    //find pr in db and update status
    let taskId = await service.findAndUpdatePR(+pull_id, status);

    if (taskId !== null) {
      // update status of task if all PRs closed
      const allStatus = await service.getPRsInTask(+taskId);

      let updatedTask;

      if (allStatus?.githubs.every((git) => git.status === 'closed')) {
        updatedTask = await service.updateTaskStatus(+taskId, 'done');
      } else {
        updatedTask = await service.updateTaskStatus(+taskId, 'review');
      }
      updatedTask && newHookTask.next(updatedTask); // with db id
      req.body = true;
      next();
    } else {
      req.body = false;
      const feedUnit = await service.createOrUpdateFeed(pull_request); 
   
      newHookFeed.next(feedUnit); // always send the pull req to feed
      next();
    }
  } catch (error) {
    console.error(error);

    res.status(500);
  }
};
