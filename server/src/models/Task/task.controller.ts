import { NextFunction, Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { newHookTask } from '../../middlewares/checkPR.middleware';
import { nextTick } from 'process';
import { NextNotification } from 'rxjs';

const service: DataService = new DataService();

export class TaskController {
  constructor(private service: DataService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = req.body;
      console.log(newTask);

      const task = await service.createTask(newTask);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async findTask(req: Request, res: Response): Promise<void> {
    try {
      const { task_id } = req.params;

      console.log(task_id);

      const task = await service.getTask(+task_id);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async hookTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // if(newHookTask.observed currentObservers === null)
      console.log('hit task', req.body);


        const headers = {
          'Cache-Control': 'no-cache',
          'Content-Type': 'text/event-stream',
          'Access-Control-Allow-Origin': '*',
          Connection: 'keep-alive',
        };
  
        res.set(headers);
  
        res.flushHeaders();
  
        newHookTask.subscribe((data: any) => {
          res.write(`data: ${JSON.stringify(data)} \n\n`);
        });
  
        req.on('close', () => {
          console.log('client closed connection');
        });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async updateTaskDetail(req: Request, res: Response): Promise<void> {
    try {
      const { task_id } = req.params;

      const updateTaskData = req.body;

      const task = await service.updateTaskDetail(+task_id, updateTaskData);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
