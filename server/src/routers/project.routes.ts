import { Router } from 'express';
import express from 'express';
import projectController from '../controllers/project.controller';

const router: Router = express.Router();

router.get('/project', projectController.selectProject);

export default router;
