import { Router, Response, Request } from 'express';
import { GithubControllers } from './../controllers/github.controller';

const router: Router = Router();
const controller = new GithubControllers();

router.get('/api/auth/callback/github', controller.tokenGithub);

router.post('/payload', controller.payloadGithub);

export default router;
