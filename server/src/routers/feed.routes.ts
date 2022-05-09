import { Router, Response, Request } from 'express';
const routerFeed: Router = Router();

routerFeed.get('/feed', async (req: Request, res: Response) => {
  console.log('reached router');
  try {
    console.log('client connected');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    //send data
    // let count = 0;
    res.write('data: ' + 'hello\n\n');
    // while (true) {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   console.log('Emit', ++count);
    //   // Emit an SSE that contains the current 'count' as a string
    //   res.write(`data: ${count}\n\n`);
    // }

    res.on('close', () => {
      console.log('client closed connection');
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
});

export default routerFeed;
