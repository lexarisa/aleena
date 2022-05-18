import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();

router.get('/users/:project_id', controller.findAllUsersInProject);
router.get('/user/bookmarks/:user_id', controller.userBookmarks);
router.post('/user/bookmarks', controller.createBookmark);
// router.patch('/bookmarks');
router.delete('/user/bookmarks', controller.deleteBookmark);

export default router;
