import { NextFunction, Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { newHookTask } from './../../middlewares/checkPR.middleware';

const service: DataService = new DataService();

export const sseTask = new Subject();

export class TaskController {
  constructor(private service: DataService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = req.body;
      console.log('task data in task controller', newTask);
      const task = await service.createTask(newTask);

      console.log('XXXXXX');
      const sse = { event: 'create', data: task };
      sseTask.next(sse);

      res.send(true);
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

  async hookTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // if(newHookTask.observed currentObservers === null)
      console.log('hit the feed HOOOOK TASK')
      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
      };

      res.set(headers);

      res.flushHeaders();

      const stream = newHookTask.subscribe((data: any) => {
        res.write(`data ${JSON.stringify(data)} \n\n`);
      });

      req.on('close', () => {
        console.log('client closed connection');
        stream.unsubscribe();
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

      const sse = { event: 'update', data: task };
      sseTask.next(sse);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async sseTask(req: Request, res: Response): Promise<void> {
    try {
      console.log('hit the sseTask');
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      });
      res.flushHeaders();

      const stream = sseTask.subscribe((data: any) => {
        console.log('DIOOOOS', data);
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });

      const streamHook = newHookTask.subscribe((data: any) => {
        console.log('YEEES', data);
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });

      req.on('close', () => {
        console.log('client closed connection');
        stream.unsubscribe();
        streamHook.unsubscribe();
      });
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      console.log('made it here');
      const { task_id } = req.params;

      const task = await service.deleteTask(+task_id);

      const sse = { event: 'delete', data: task };
      sseTask.next(sse);

      res.send(task);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
