import { Router } from 'express';
import { sendFeed } from './feed.controllers';
import { cleanData } from '../../middlewares/clean.middleware';
const routerFeed: Router = Router();

routerFeed.post('/payload', cleanData, sendFeed); // to send clean data to client
routerFeed.get('/feed', sendFeed); // to connect

export default routerFeed;
