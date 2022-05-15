import { Router } from 'express';
import { DocumentationController } from './documentation.controllers';
const router: Router = Router();
const controller = new DocumentationController();

router.post('/documentation', controller.createDocumentation);
router.patch('/documentation', controller.updateDocumentation);
router.delete('/documentation', controller.deleteDocumentation);

router.get('/documentation/:milestoneId', controller.getAllDocsInMilestone);

export default router;
