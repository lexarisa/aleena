import { Router } from 'express';
import { GithubControllers } from './../controllers/github.controller';

const router: Router = Router();
const controller = new GithubControllers;

router.get('/login', controller.loginGithub);

router.post('/payload', controller.payloadGithub);


export default router;