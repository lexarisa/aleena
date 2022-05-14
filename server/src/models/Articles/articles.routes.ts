import { Router } from 'express';
import { ArticleController } from './articles.controllers';

const router: Router = Router();
const controller = new ArticleController();

router.post('/article', controller.createArticle);
router.patch('/article', controller.updateArticle); //update
router.delete('/article', controller.deleteArticle); //delete

//TODO: routes to bookmark

export default router;
