import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

export class MilestoneController {

  constructor(private service: DataService) {}

  async createMilestone(req: Request, res: Response): Promise<void> {
    try {
      const title = req.body;

      const { project_id } = req.params;

      const milestone = await this.service.createMilestone(title, +project_id);

      res.send(milestone);
          
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  };

  async getAllTasksInMilestone(req: Request, res: Response): Promise<void> {
    try {
      const { milestoneId } = req.params;

      const allTasks = await this.service.getAllTasksInMilestone(+milestoneId);

      res.send(allTasks);
    } catch (error) {
      console.error(error);
      
      res.status(500);
    }
  }
}
