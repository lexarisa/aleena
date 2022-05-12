import { newHook } from '../middlewares/checkPR.middleware';
import { Request, Response, NextFunction } from 'express';

export const updateTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    newHook.subscribe((data) => {
      res.write(`data: ${JSON.stringify(data)} \n\n`);
    });

    req.on('close', () => {
      console.log('client closed connection');
    });
    next();

    return res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
};
