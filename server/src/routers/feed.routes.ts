import { Router } from 'express';
import { connectClient } from '../controllers/feed.controllers';
const routerFeed: Router = Router();

routerFeed.get('/feed', connectClient);

export default routerFeed;
