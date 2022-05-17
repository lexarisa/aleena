import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();

router.get('/users/:project_id', controller.findAllUsersInProject);

export default router;
