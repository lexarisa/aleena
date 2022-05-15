import { Router } from 'express';
import { ArticleController } from './articles.controllers';

const router: Router = Router();
const controller = new ArticleController();

// get articles in milestone
router.get('/article/:documentation_id', controller.getAllArticlesInDocument);
router.get('/article', controller.getArticle);
router.post('/article', controller.createArticle);
router.patch('/article', controller.updateArticle); //update
router.delete('/article', controller.deleteArticle); //delete

//TODO: routes to bookmark

export default router;
