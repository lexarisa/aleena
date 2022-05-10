import { Router } from 'express';
import express from 'express';
const router: Router = express.Router();
import dashboardControllers from '../controllers/dashboard.controller';

router.get('/dashboard', dashboardControllers.getMainDashboard);

export default router;
