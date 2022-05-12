import { Request, Response } from 'express';
import { DataService } from '../../services/data.service'

const service: DataService = new DataService();

export class UserController {
  
  constructor(){}

  async userProjects(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;

      const projects = await service.getUserProjects(+user_id);

      res.send(projects);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}


