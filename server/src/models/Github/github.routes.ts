import { Router } from 'express';
import { GithubController } from './github.controller';
import { FeedController } from './../Feed/feed.controllers';
import { TaskController } from './../Task/task.controller';
import { cleanData } from './../../middlewares/clean.middleware';
import { checkPR } from './../../middlewares/checkPR.middleware';
import { DataService } from './../../services/data.service';
import { GitHubService } from './../../services/github.service';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new GithubController();
// @ts-ignore missing correct dependency injection
const feedController = new FeedController();
// @ts-ignore missing correct dependency injection
const taskController = new TaskController();

router.get('/api/auth/callback/github', controller.tokenGithub);

router.post('/github/PR', controller.createPR);

router.post('/payload', cleanData, checkPR, taskController.hookTask, feedController.hookFeed);

export default router;
