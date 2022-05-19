import { Router } from 'express';
import { CommentController } from './comment.controller';

const router: Router = Router();
const controller = new CommentController();

router.get('/comments/:task_id', controller.getAllComments);
router.post('/comment', controller.addComment);
router.delete('/comments/:comment_id', controller.deleteComment);

export default router;
