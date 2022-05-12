import { NextFunction, Request, Response } from 'express';
import { Subject } from 'rxjs';
export const newLog = new Subject();

export const sendEvent = (req: Request, res: Response, next: NextFunction) => {
  const pullEvent = req.body;
  newLog.next(pullEvent);
  next();
};
