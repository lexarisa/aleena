import { Request, Response } from 'express';
import { Service } from 'typedi';
import { newHookFeed } from './../../middlewares/checkPR.middleware';
import { DataService } from './../../services/data.service';

const service: DataService = new DataService();

export class FeedController {

  async hookFeed(req: Request, res: Response): Promise<void> {
    try {
      console.log('hit the feed HOOOOK')
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      });
      res.flushHeaders();
  
      const stream = newHookFeed.subscribe((data: any) => {
        console.log(data)
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });
  
      req.on('close', () => {
        console.log('client closed connection');
        stream.unsubscribe();
      });
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  };

  async latestFeeds(req: Request, res: Response): Promise<void> {
    try {
      const latestFeeds = await service.getLatestFeeds();

      res.send(latestFeeds)
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  }
}
