import { Router } from 'express';
import express from 'express';
const dashRouter: Router = express.Router();
import dashboardControllers from '../controllers/dashboard.controller';

dashRouter.get(
  '/dashboard/:project_id/:user_id/:page',
  dashboardControllers.getMainDashboard
);

export default dashRouter;
