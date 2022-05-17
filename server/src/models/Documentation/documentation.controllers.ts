import { DataService } from '../../services/data.service';
import { Request, Response } from 'express';
const service: DataService = new DataService();
import { Subject } from 'rxjs';

const newDocumentationSSE = new Subject();

export class DocumentationController {
  async createDocumentation(req: Request, res: Response): Promise<void> {
    try {
      const { title, milestone_id } = req.body;
      const doc = await service.createDocumentation(title, +milestone_id);
      const sse = { event: 'create', data: doc };
      newDocumentationSSE.next(sse);
      res.send(doc);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
  async updateDocumentation(req: Request, res: Response): Promise<void> {
    try {
      const { title, id } = req.body;
      const doc = await service.updateDocumentation(title, +id);
      const sse = { event: 'update', data: doc };
      newDocumentationSSE.next(sse);
      res.send(doc);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
  async deleteDocumentation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const doc = await service.deleteDocumentation(+id);
      const sse = { event: 'delete', data: doc };
      newDocumentationSSE.next(sse);
      res.send(doc);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }

  async getAllDocsInMilestone(req: Request, res: Response): Promise<void> {
    try {
      const { milestoneId } = req.params;
      const allDocs = await service.getAllDocsInMilestone(+milestoneId);
      res.send(allDocs);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
  async getAllDocumentsInProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const project_id = projectId;

      const allDocs = await service.getAllDocumentsInProject(+project_id);
      res.send(allDocs);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async documentationSSE(req: Request, res: Response): Promise<void> {
    // GET
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
      };
      res.set(headers);
      res.flushHeaders();

      const stream = newDocumentationSSE.subscribe((data: any) => {
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
