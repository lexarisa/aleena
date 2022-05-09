import { Router, Response, Request } from 'express';
const routerFeed: Router = Router();

let tasks = ['task one', 'task two', 'task three'];

routerFeed.get('/feed', async (req: Request, res: Response) => {
  console.log('reached router');
  try {
    console.log('client connected');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    // res.flushHeaders();

    while (tasks.length > 0) {
      let currentTask = tasks.pop();
      res.write(`data: ${currentTask}\n\n`);
    }
    // tasks = [];

    res.on('close', () => {
      console.log('client closed connection');
      res.end();
    });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

export default routerFeed;
