import { Request, Response, NextFunction } from 'express';

import { Subject } from 'rxjs';
export const newHook = new Subject();

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
    const status = pull_request.action === 'closed' ? 'closed' : 'opened';
    // const updatedTask;

    //find pr in db and update status
    let taskId;
    if (status === 'closed') {
      taskId = await service.closePR(+pullId);
    } else {
      taskId = await service.openPR(+pullId);
    }

    if (taskId) {
      // update status of task if all PRs closed
      const allStatus = await service.getPRsInTask(+taskId);
      console.log(allStatus); // check type to see how to iterate
      if (allStatus?.githubs.every((s) => s.status === 'closed')) {
        let updatedTask = await service.updateTaskStatus(+taskId);
        //send the updated task
        newHook.next(updatedTask);

        next();
      }
    } else {
      //create Github table
      let { pull_id, title, number, pull_url, comment } = pull_request;
      const newPR = { pull_id, title, status, number, pull_url, comment }; // not linked with any tasks
      await service.createPR(newPR);
    }

    //TODO  send to frontend
  } catch (error) {
    console.error(error);
    res.status(500);
    //res.send()
  }
};
