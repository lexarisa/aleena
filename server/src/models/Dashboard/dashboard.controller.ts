import { Request, Response } from 'express';
import { DataService } from '../../services/data.service'

const service = new DataService();

export class DashboardController {

  constructor(private service: DataService){}
  
  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const { project_id, user_id, page } = req.params;

      const allStatus = ['To Do','In Progress','Review','Done','Backlog'];

      const dashboard: any = [];

      allStatus.forEach(async (status: string) => {
        const dash = await service.getDashboard(+project_id, +user_id, +page, status);
        dashboard.push(dash);
      })

      console.log(dashboard);
      
      res.send(dashboard);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  };
};

