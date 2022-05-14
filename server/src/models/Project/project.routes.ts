import { Router } from 'express';
import { ProjectController } from './project.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new ProjectController();

router.get('/projects/:id', controller.getProject);

router.post('/projects/:user_id', controller.createProject);
router.delete('/projects/:id', controller.deleteProject);

export default router;
