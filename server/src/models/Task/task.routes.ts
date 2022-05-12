import { Router } from 'express';
import { TaskController } from './task.controller';

const taskRouter: Router = Router();
const controller = new TaskController();

taskRouter.post('/task', controller.createTask);
taskRouter.get('/task/:id', controller.findTask);

export default taskRouter;
