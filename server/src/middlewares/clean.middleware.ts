import { Request, Response, NextFunction } from 'express';
import { cleanPullRequest } from '../utils/pull_request.utils';

export const cleanData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const event_type = req.headers['x-github-event'];

    const payload = req.body;

    if (event_type === 'pull_request') {

      let cleanPR = cleanPullRequest(payload);

      if (cleanPR) {
        req.body = cleanPR;
      } 
      
      next();
    } else {
      res.send({ error: 'not a pull request' }); 
    } 
  } catch (error) {
    console.error(error);
  }
};
