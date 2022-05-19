import { Router } from 'express';
import { cleanData } from './../../middlewares/clean.middleware';
import { checkPR } from './../../middlewares/checkPR.middleware';
import { FeedController } from './feed.controllers';

const router: Router = Router();
const controller: FeedController = new FeedController();

router.get('/feed/latest', controller.latestFeeds);

// SSE 
router.get('/feed', controller.hookFeed);

router.post('/payload/feed', cleanData, checkPR, controller.hookFeed);

export default router;
