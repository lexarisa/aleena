import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service = new DataService();

export class MilestoneController {
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
}
