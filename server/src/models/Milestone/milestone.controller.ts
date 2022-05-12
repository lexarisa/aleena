import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class MilestoneController {
  constructor() {}

  async getAllTasksInMilestone(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const allTasks = await service.getAllTasksInMilestone(+id);
      res.send(allTasks);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
