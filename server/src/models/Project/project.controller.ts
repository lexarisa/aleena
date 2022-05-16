import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class ProjectController {
  constructor(private service: DataService) {}

  async getProject(req: Request, res: Response): Promise<void> {
    try {
      console.log('hittttt');
      const { id } = req.params;
      console.log('here');
      const project = await service.getProject(+id);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      console.log('hit the server');
      const { user_id } = req.body;
      const id = user_id;
      const { title, description, status } = req.body;
      const newProject = { title, description, status };
      const project = await service.createProject(+id, newProject);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const project = await service.deleteProject(+id);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
