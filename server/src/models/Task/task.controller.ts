import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

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
      
      const task = await service.getTask(+id)

      res.send(task);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}