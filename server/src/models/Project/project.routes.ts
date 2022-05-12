import { Router } from 'express';
import { ProjectController } from './project.controller';

const router: Router = Router();
const controller = new ProjectController();

router.get('/project/:id', controller.selectProject);
router.post('/project', controller.createProject);
router.delete('/project/:id', controller.deleteProject);

export default router;