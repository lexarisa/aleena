import { Request, Response } from 'express';
import { DataService } from '../../services/data.service'

const service = new DataService();

export class DashboardController {

  constructor(private service: DataService){}
  
  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const { project_id, user_id, page } = req.params;

      const dashboard = await service.getDashboard(+project_id, +user_id, +page);

      res.send(dashboard);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  };
};

