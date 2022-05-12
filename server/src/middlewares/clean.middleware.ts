import { Request, Response, NextFunction } from 'express';
import { cleanPullRequest } from '../utils/pull_request.utils';

export const cleanData = 
async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const event_type = req.headers['x-github-event'];
  
    const payload = req.body;
  
    if (event_type === 'pull_request') {
      req.body = cleanPullRequest(payload);
    } else {
      req.body = { data: 'empty data' };
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500)
  }
};
