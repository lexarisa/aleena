import { Router } from 'express';
import { cleanData } from './../../middlewares/clean.middleware';
import { TaskController } from './task.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new TaskController();

// router.get('/hookTask', controller.hookTask);

router.get('/task/:task_id', controller.findTask);

router.post('/task', controller.createTask);

router.delete('/task/:task_id', controller.deleteTask);

router.patch('/task/:task_id', controller.updateTaskDetail);

router.get('/payload/task', cleanData, controller.createTask);

router.get('/tasks/sse', controller.sseTask);

export default router;
