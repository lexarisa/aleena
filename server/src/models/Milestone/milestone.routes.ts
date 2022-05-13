import { Router } from 'express';
import { MilestoneController } from './milestone.controller';

const router: Router = Router();
// @ts-ignore missing correct dependency injection
const controller = new MilestoneController();

router.get('/milestone/:milestoneId', controller.getAllTasksInMilestone);

router.get('/milestone/dash/:project_id', controller.getDashMilestones);

// router.post('/payload', controller.payloadGithub);

export default router;
