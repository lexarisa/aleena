import { Router } from 'express';
import { updateTasks } from '../controllers/task.update.controller';
import { cleanData } from '../middlewares/clean.middleware';
const routerUpdateTasks: Router = Router();

routerUpdateTasks.post('/payload', cleanData, updateTasks); // to update Tasks //!CHECK DB

routerUpdateTasks.get('/updateTasks', updateTasks); // to connect

export default routerUpdateTasks;
