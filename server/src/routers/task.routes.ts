import { Router } from 'express';
import express from 'express';
import taskController from '../controllers/task.controller';

const router: Router = express.Router();

router.post('/task', taskController.createNewTask);
router.get('/task/:taskId', taskController.findSingleTask);

export default router;
