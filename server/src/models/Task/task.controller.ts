import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { newHookTask } from '../../middlewares/checkPR.middleware';

export class TaskController {
  
  constructor(private service: DataService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = req.body;
      console.log(newTask);

      const task = await this.service.createTask(newTask);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async findTask(req: Request, res: Response): Promise<void> {
    try {
      const { task_id } = req.params;

      console.log(task_id)

      const task = await this.service.getTask(+task_id);

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

      newHookTask.subscribe((data: any) => {
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

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { task_id } = req.params;

      const updateTaskData = req.body;

      const task = await this.service.updateTask(+task_id, updateTaskData);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
