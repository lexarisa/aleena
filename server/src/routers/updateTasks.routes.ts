import { Router } from 'express';
import { updateTasks } from '../controllers/task.update.controller';
import { cleanData } from '../middlewares/clean.middleware';
import { checkPR } from '../middlewares/checkPR.middleware';
import { updateFeed } from '../models/Feed/feed.controllers';
const routerUpdateTasks: Router = Router();

routerUpdateTasks.post('/payload', cleanData, checkPR, updateTasks, updateFeed);
routerUpdateTasks.get('/updateTasks', updateTasks); // to connect

export default routerUpdateTasks;
