import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();


router.get('/project/:user_id', controller.userProjects);


export default router;
