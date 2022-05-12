import { Router } from 'express';
import { cleanData } from './../../middlewares/clean.middleware';
import { TaskController } from './task.controller';

const router: Router = Router();
const controller = new TaskController();

router.get('/hookTask', controller.hookTask);

router.get('/task/:task_id', controller.findTask);

router.post('/task', controller.createTask);

router.post('/payload', cleanData, controller.createTask);

export default router;