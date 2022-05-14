import { DataService } from '../../services/data.service';
import { Request, Response } from 'express';
const service: DataService = new DataService();

export class DocumentationController {
  async createDocumentation(req: Request, res: Response): Promise<void> {
    try {
      const { title, milestone_id } = req.body;
      const doc = await service.createDocumentation(title, +milestone_id);
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
}
