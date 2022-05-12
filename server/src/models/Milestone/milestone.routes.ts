import { Router } from 'express';
import { MilestoneController } from './milestone.controller';

const router: Router = Router();
const controller = new MilestoneController();

router.get('/milestone/:milestoneId', controller.getAllTasksInMilestone);

// router.post('/payload', controller.payloadGithub);

export default router;
