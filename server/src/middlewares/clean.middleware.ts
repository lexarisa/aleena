import { Request, Response, NextFunction } from 'express';
import { updateTasks } from './../controllers/task.update.controller';
import { cleanPullRequest } from '../utils/piping/pull.request';

export const cleanData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  
  const event_type = req.headers['x-github-event'];
  // console.log('body', req.body)
  const payload = req.body;
  if (event_type === 'pull_request') {
    req.body = cleanPullRequest(payload); //OVERWRITING BODY

  } else req.body = { data: 'empty data' };
  next();
};
