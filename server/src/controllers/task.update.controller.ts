import { Request, Response } from 'express';
import { newLog } from './../utils/piping/pull.request';

export const updateTasks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    newLog.subscribe((data) => {
      res.write(`data: ${JSON.stringify(data)} \n\n`);
    })

    req.on('close', () => {
      console.log('client closed connection');
    });

    return res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
};
