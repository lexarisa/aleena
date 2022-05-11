import { Router } from 'express';
import express from 'express';
import projectController from '../controllers/project.controller';

const projectRouter: Router = express.Router();

projectRouter.get('/project/:projectId', projectController.selectProject);

export default projectRouter;
