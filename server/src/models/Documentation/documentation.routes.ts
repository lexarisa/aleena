import { Router } from 'express';
import { DocumentationController } from './documentation.controllers';
const router: Router = Router();
const controller = new DocumentationController();

router.get('/documentation/sse', controller.documentationSSE);
router.get(
  '/documentation/project/:projectId',
  controller.getAllDocumentsInProject
);
router.get('/documentation/:milestone_d', controller.getAllDocsInMilestone);
router.post('/documentation', controller.createDocumentation);
router.patch('/documentation', controller.updateDocumentation);
router.delete('/documentation', controller.deleteDocumentation);

export default router;
