import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service = new DataService();

export class MilestoneController {
  constructor() {}
  async createMilestone(req: Request, res: Response): Promise<void> {
    try {
      const title = req.body;
      const { project_id } = req.params;
      const milestone = await service.createMilestone(title, +project_id);
      res.send(milestone);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }

  async getAllTasksInMilestone(req: Request, res: Response): Promise<void> {
    try {
      console.log('runnnningg');
      const { milestoneId } = req.params;
      console.log(milestoneId);

      const allTasks = await service.getAllTasksInMilestone(+milestoneId);
      console.log(allTasks);
      res.send(allTasks);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
