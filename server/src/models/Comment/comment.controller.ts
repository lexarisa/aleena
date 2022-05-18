import { NextFunction, Request, Response } from 'express';
import { DataService } from '../../services/data.service';

const service: DataService = new DataService();
export class CommentController {
  constructor() {}

  async addComment(req: Request, res: Response): Promise<void> {
    try {
      const { comment } = req.body;
      const newComment = await service.addComment(comment);
      res.status(201).send(newComment);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async getAllComments(req: Request, res: Response): Promise<void> {
    try {
      const { task_id } = req.params;
      const allComments = await service.getAllComments(+task_id);
      res.status(200).send(allComments);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const { comment_id } = req.params;
      const commentToDelete = await service.deleteComment(+comment_id);
      res.status(204).send(commentToDelete);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
