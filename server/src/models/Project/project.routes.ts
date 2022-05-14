import { Router } from 'express';
import { ProjectController } from './project.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new ProjectController();

router.get('/project/:id', controller.getProject);
router.post('/project', controller.createProject);
router.delete('/project/:id', controller.deleteProject);

export default router;
