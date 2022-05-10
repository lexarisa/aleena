import { Router } from 'express';
import { TaskController } from './task.controller';

const router: Router = Router();
const controller = new TaskController();

router.post('/task', controller.createTask);
router.get('/task/:task_id', controller.findTask);

export default router;