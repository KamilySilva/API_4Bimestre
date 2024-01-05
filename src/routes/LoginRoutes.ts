import Express from 'express';
import LoginController from '../controllers/LoginController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Express.Router();

router.post('/login', LoginController.login);
router.get('/getProfile', authMiddleware, LoginController.getProfile);

export default router;