import { Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();

export class UserController {
  constructor() {}

  async userBookmarks(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const bookmarkedArticles = await service.getUserBookmarks(+user_id);
      res.send(bookmarkedArticles);
    } catch (error) {
      console.error(error);
    }
  }
  async createBookmark(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const { article_id } = req.body;
      const bookmarkedArticle = await service.createBookmarks(
        +user_id,
        +article_id
      );
      res.send(bookmarkedArticle);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteBookmark(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const { article_id } = req.body;
      const unBookmarkedArticle = await service.deleteBookmarks(
        +user_id,
        +article_id
      );
      res.send(unBookmarkedArticle);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllUsersInProject(req: Request, res: Response): Promise<void> {
    try {
      const { project_id } = req.params;
      const users = await service.findAllUsersInProject(+project_id);
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
