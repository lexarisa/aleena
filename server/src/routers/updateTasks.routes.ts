import { Router } from 'express';
import { updateTasks } from '../controllers/task.update.controller';
import { cleanData } from '../middlewares/clean.middleware';
import { checkPR } from '../middlewares/checkPR.middleware';
const routerUpdateTasks: Router = Router();

routerUpdateTasks.post('/payload', cleanData, checkPR, updateTasks);
routerUpdateTasks.get('/updateTasks', updateTasks); // to connect

export default routerUpdateTasks;
