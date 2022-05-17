import { Router } from 'express';
import { ProjectController } from './project.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new ProjectController();

router.post('/project', controller.createProject);

router.get('/UserProjects/:user_id', controller.userProjects);

router.get('/projects/:id', controller.getProject);

router.get('/project/sse', controller.sseProject);

router.delete('/projects/:id', controller.deleteProject);
router.get('/projects/sse', controller.sseProject);

export default router;
