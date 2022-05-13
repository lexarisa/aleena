import { Router } from 'express';
import { DashboardController } from './dashboard.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new DashboardController();

router.get('/dashboard/:project_id/:user_id/:page', controller.getDashboard);

// router.get('/dashboard/:token', controller.getDashboard);

export default router;
