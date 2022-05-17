import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();

router.get('/users', controller.findAllUsersInProject);

export default router;
