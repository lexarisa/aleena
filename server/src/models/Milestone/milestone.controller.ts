import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class MilestoneController {
  constructor(private service: DataService) {}

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

  // TODO 10 TASKS PER STATUS PER MILESTONE
  async getAllTasksInMilestone(req: Request, res: Response): Promise<void> {
    try {
      console.log('runnnningg');
      const { milestoneId } = req.params;
      console.log(milestoneId);

      const allTasks = await service.getAllTasksInMilestone(+milestoneId);

      res.send(allTasks);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async getDashMilestones(req: Request, res: Response): Promise<void> {
    try {
      const { project_id } = req.params;

      const milestones = await service.getDashMilestones(+project_id);
      console.log('urze', milestones);
      res.send(milestones);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
