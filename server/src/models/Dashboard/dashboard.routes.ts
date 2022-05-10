import { Router } from 'express';
import { DashboardController } from './dashboard.controller';

const router: Router = Router();
const controller = new DashboardController();

router.get('/dashboard/:project_id/:user_id/:page', controller.getDashboard);

export default router;
