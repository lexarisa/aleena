import { Router } from 'express';
import { GithubControllers } from './github.controller';

const router: Router = Router();
const controller = new GithubControllers();

router.get('/api/auth/callback/github', controller.tokenGithub);

router.post('/github/PR', controller.createPR);

// router.post('/payload', controller.payloadGithub);

export default router;
