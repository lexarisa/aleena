import { NextFunction, Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';

const newMilestoneSSE = new Subject();

const service: DataService = new DataService();

export class MilestoneController {
  constructor(private service: DataService) {}

  //-----SSE-----//

  async createMilestone(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //POST
    try {
      const { title, project_id } = req.body;

      console.log('hit the controller', title);
      const milestone = await service.createMilestone(title, +project_id);
      // connect with other computers
      const sse = { event: 'create', data: milestone };
      newMilestoneSSE.next(sse);
      console.log('XXXXXXX');
      res.send(milestone);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
  async updateMilestone(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //POST
    try {
      const { title, milestone_id } = req.body;

      const milestone = await service.updateMilestone(title, +milestone_id);
      // connect with other computers
      const sse = { event: 'update', data: milestone };
      newMilestoneSSE.next(sse);
      res.send(milestone);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
  async deleteMilestone(req: Request, res: Response): Promise<void> {
    //POST
    try {
      const { milestone_id } = req.body;
      const milestone = await service.deleteMilestone(+milestone_id);

      const sse = { event: 'delete', data: milestone };
      newMilestoneSSE.next(sse);
      res.send(milestone);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
  //-----------//

  // TODO 10 TASKS PER STATUS PER MILESTONE
  async getAllTasksInMilestone(req: Request, res: Response): Promise<void> {
    try {
      const { milestoneId } = req.params;

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

      res.send(milestones);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async milestoneSSE(req: Request, res: Response): Promise<void> {
    //     /GET
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
      };
      res.set(headers);
      res.flushHeaders();

      const stream = newMilestoneSSE.subscribe((data: any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });

      req.on('close', () => {
        stream.unsubscribe();
        console.log('connection closed');
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
