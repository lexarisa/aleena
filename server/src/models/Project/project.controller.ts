import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';

const service: DataService = new DataService();
const newSseProject = new Subject();

export class ProjectController {
  constructor(private service: DataService) {}

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

      const { title, description, status, milestones } = req.body;

      const newProject = { title, description, status };

      const milesData = milestones;

      const project = await service.createProject(+user_id, newProject, milesData);

      const sse = { event: 'create', data: project };
      newSseProject.next(sse);

      newSseProject.next(project);
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

      const sse = { event: 'delete', data: project };
      newSseProject.next(sse);

      res.send(project);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async sseProject(req: Request, res: Response): Promise<void> {
    try {
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      });
      res.flushHeaders();

      const stream = newSseProject.subscribe((data: any) => {
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

  async addUserToProject(req: Request, res: Response): Promise<void> {
    try {
      const { username, project_id } = req.body;
      const addUser = await service.addUserToProject(username, project_id);
      res.send(addUser);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
