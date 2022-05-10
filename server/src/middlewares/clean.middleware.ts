import { Request, Response, NextFunction } from 'express';
import { pipePullRequest } from '../utils/piping/pull.request';

export const cleanData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log('reached cleanData');
  const event_type = req.headers['X-GitHub-Event'];
  const payload = JSON.parse(req.body);
  if (event_type === 'pull_request') {
    req.body = JSON.stringify(pipePullRequest(payload)); //OVERWRITTING BODY  req.pipedData
  }
  next();
};
