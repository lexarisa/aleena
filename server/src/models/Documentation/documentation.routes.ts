import { Router } from 'express';
import { DocumentationController } from './documentation.controllers';
const router: Router = Router();
const controller = new DocumentationController();

// router.get('/article/sse', controller.milestoneSSE); // connect to client
// router.post('/article', controller.createMilestone);
// router.patch('/article', controller.updateMilestone); //update
// router.delete('/article', controller.deleteMilestone); //delete
router.post('/documentation', controller.createDocumentation);
router.patch('/documentation', controller.updateDocumentation);
router.delete('/documentation', controller.deleteDocumentation);

router.get('/documentation/:milestoneId', controller.getAllDocsInMilestone);
// // router.get('/docuemntation/dash/:project_id', controller.getDashMilestones);
export default router;
