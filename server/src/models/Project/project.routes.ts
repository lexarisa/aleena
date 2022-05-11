import { Router } from 'express';
import { ProjectController } from './project.controller';

const router: Router = Router();
const controller = new ProjectController();

router.get('/project', controller.selectProject);

export default router;
