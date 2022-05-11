import { Request, Response } from 'express';
<<<<<<< HEAD
=======

>>>>>>> development

export const sendFeed = async (req: Request, res: Response): Promise<any> => {
  console.log('reached router');
  try {
    console.log('client connected');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
    });

    //CLEAN DATA
    if (req.body) {
      const payload = req.body;
      res.write(`data: ${payload}\n\n`);
    } else res.write(`data: ${'establishing connection'}\n\n`);

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
