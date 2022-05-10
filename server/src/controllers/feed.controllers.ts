import { Request, Response } from 'express';

export const connectClient = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log('reached router');
  try {
    console.log('client connected');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
    });
    console.log('REQ', req.body);
    res.write(`data: ${'currentTask'}\n\n`);

    res.on('close', () => {
      console.log('client closed connection');
      res.end();
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
  // res.flushHeaders();
};

// module.exports = { connectClient };
