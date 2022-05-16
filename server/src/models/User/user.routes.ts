import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();

export default router;
