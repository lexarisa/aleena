import { Router } from 'express';
import { FeedController } from './feed.controllers';

const router: Router = Router();
const controller: FeedController = new FeedController();

router.get('/feed', controller.hookFeed);

export default router;
