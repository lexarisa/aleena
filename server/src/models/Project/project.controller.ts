import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

export class ProjectController {

  constructor(private service: DataService) {}

  async selectProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const project = await this.service.getProject(+id);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async createProject (req: Request, res: Response): Promise<void> {
    try {
      const project = await this.service.createProject(req.body)

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  };
  
  
  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const project = await this.service.deleteProject(+id)

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

};
