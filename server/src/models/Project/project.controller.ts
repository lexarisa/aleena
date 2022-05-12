import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class ProjectController {
  constructor() {}

  async selectProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const project = await service.getProject(+id);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
