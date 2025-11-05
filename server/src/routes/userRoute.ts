import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/user', getUser);
router.put('/user', updateUser);    

export default router;