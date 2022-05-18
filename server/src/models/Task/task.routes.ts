import { Router } from 'express';
import { cleanData } from './../../middlewares/clean.middleware';
import { TaskController } from './task.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new TaskController();

router.get('/task/:task_id', controller.findTask);

router.get('/filter/tasks', controller.getFilterTask);

router.post('/task', controller.createTask);

router.delete('/task/:task_id', controller.deleteTask);

router.patch('/task/:task_id', controller.updateTaskDetail);

// HOOKS AND SSEs

router.get('/payload/task', cleanData, controller.createTask);

router.get('/tasks/sse', controller.sseTask);

export default router;
