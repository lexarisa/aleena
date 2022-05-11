import { Router } from 'express';
<<<<<<< HEAD:server/src/models/Feed/feed.routes.ts
import { sendFeed } from './feed.controllers';
=======
import { sendFeed } from '../controllers/feed.controllers';
import { cleanData } from '../middlewares/clean.middleware';
>>>>>>> development:server/src/routers/feed.routes.ts
const routerFeed: Router = Router();

routerFeed.post('/payload', cleanData, sendFeed); // to send clean data to client
routerFeed.get('/feed', sendFeed); // to connect

export default routerFeed;
