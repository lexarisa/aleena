import { Router } from 'express';
import express from 'express';
import taskController from '../controllers/task.controller';

const taskRouter: Router = express.Router();

taskRouter.post('/task', taskController.createNewTask);
taskRouter.get('/task/:taskId', taskController.findSingleTask);

export default taskRouter;
