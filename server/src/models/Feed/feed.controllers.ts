import { Request, Response } from 'express';
import { newHookFeed } from './../../middlewares/checkPR.middleware';


export class FeedController {

  async hookFeed(req: Request, res: Response): Promise<void> {
    try {
      console.log('hit the feed')
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      });
      res.flushHeaders();
  
      newHookFeed.subscribe((data: any) => {
        console.log(data)
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });
  
      req.on('close', () => {
        console.log('client closed connection');
      });
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  };
}
