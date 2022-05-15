import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class ArticleController {

  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const { documentation_id, title, content } = req.body;
      
      const article = await service.createArticle(
        documentation_id,
        title,
        content
      );

      res.send(article);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, content } = req.body;

      const article = await service.updateArticle(id, title, content);

      res.send(article);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      const article = await service.deleteArticle(+id);

      res.send(article);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }

  async getAllArticlesInDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const allArticles = await service.getAllArticlesInDocument(+id);

      res.send(allArticles);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
}
