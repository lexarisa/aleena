import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();
const controller = new UserController();

router.get('/user/bookmarks', controller.userBookmarks);
router.post('/user/bookmarks', controller.createBookmark);
// router.patch('/bookmarks');
router.delete('/user/bookmarks', controller.deleteBookmark);

export default router;
