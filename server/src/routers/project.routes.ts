import { Router } from 'express';
import express from 'express';
import projectController from '../controllers/project.controller';

const projectRouter: Router = express.Router();

projectRouter.get('/project/:id', projectController.selectProject);
projectRouter.get('/projects/:userId', projectController.getAllProjects);
projectRouter.post('/project', projectController.createProject);
projectRouter.delete('/project/:projectId', projectController.deleteProject);

export default projectRouter;
