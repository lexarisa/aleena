import { DataService } from '../../services/data.service';
import { Request, Response } from 'express';
const service: DataService = new DataService();
import { Subject } from 'rxjs';
const newArticleSSE = new Subject();

export class ArticleController {
  async getArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const article = await service.getArticle(id);
      res.send(article);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const { documentation_id, title, content } = req.body;
      const article = await service.createArticle(
        documentation_id,
        title,
        content
      );
      const doc = await service.getDocumentation(documentation_id);
      const sse = { event: 'create', data: doc };
      newArticleSSE.next(sse);
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
      //@ts-ignore
      const { documentation_id } = article;

      const doc = await service.getDocumentation(documentation_id);
      const sse = { event: 'update', data: doc };
      newArticleSSE.next(sse);
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
      //@ts-ignore
      const { documentation_id } = article;

      const doc = await service.getDocumentation(documentation_id);
      const sse = { event: 'delete', data: doc };
      newArticleSSE.next(sse);
      res.send(article);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }

  async getAllArticlesInDocument(req: Request, res: Response): Promise<void> {
    try {
      const { documentation_id } = req.params;

      const allArticles = await service.getAllArticlesInDocument(
        +documentation_id
      );
      res.send(allArticles);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  }
  async articleSSE(req: Request, res: Response): Promise<void> {
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

      const stream = newArticleSSE.subscribe((data: any) => {
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
