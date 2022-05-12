import { Request, Response } from 'express';
import { newHookFeed } from './../../middlewares/checkPR.middleware';


export class FeedController {
  
  async hookFeed(req: Request, res: Response): Promise<void> {
    try {
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
      });

      res.flushHeaders();
  
      newHookFeed.subscribe((data: any) => {
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });
  
      req.on('close', () => {
        console.log('client closed connection');
      });
  
      res.status(200);
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  };



}
