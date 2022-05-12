import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';
// import { newHook } from '../../utils/pull_request.utils'
import { newHook } from '../../middlewares/checkPR.middleware';

const service: DataService = new DataService();

export class TaskController {
  constructor() {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = req.body;

      const task = await service.createTask(newTask);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async findTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const task = await service.getTask(+id);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async hookTask(req: Request, res: Response): Promise<void> {
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
      };

      res.set(headers);

      res.flushHeaders();

      newHook.subscribe((data: any) => {
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
  }
}
