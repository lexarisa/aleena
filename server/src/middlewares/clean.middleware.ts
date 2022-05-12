import { Request, Response, NextFunction } from 'express';
import { cleanPullRequest } from '../utils/pull.request.utils';

export const cleanData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const event_type = req.headers['x-github-event'];
  const payload = req.body;
  if (event_type === 'pull_request') {
    let cleanPull = cleanPullRequest(payload);
    if (cleanPull) req.body = cleanPull;
    else res.send({ error: 'not a selected event' });
    next();
  } else res.send({ error: 'not a pull request' });
};
