import { Request, Response, NextFunction } from 'express';
import pipePullRequest from 'src/utils/piping/pull.request';

export const pipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const event_type = req.headers['X-GitHub-Event'];
  const payload = JSON.parse(req.body);
  if (event_type === 'pull_request') {
    return pipePullRequest(payload);
  }
};
