import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';

const service: DataService = new DataService();
const newSse = new Subject();

export class ProjectController {
  constructor(private service: DataService) {}

  async getProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const project = await service.getProject(+id);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.body;
      const id = user_id;
      const { title, description, status } = req.body;
      const newProject = { title, description, status };
      const project = await service.createProject(+id, newProject);

      newSse.next(project);
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

  async sseProject(req: Request, res: Response): Promise<void> {
    try {
      console.log('hit the feed');
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      });
      res.flushHeaders();

      const stream = newSse.subscribe((data: any) => {
        console.log(data);
        res.write(`data: ${JSON.stringify(data)} \n\n`);
      });

      req.on('close', () => {
        console.log('client closed connection');
        stream.unsubscribe();
      });
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  }
}
