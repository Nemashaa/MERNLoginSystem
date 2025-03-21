import express, { Router } from 'express';
import cors from 'cors';
import { 
  test, 
  registerUser, 
  loginUser, 
  refreshAccessToken, 
  logoutUser, 
  getProfile 
} from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.post('/refreshToken', refreshAccessToken);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshAccessToken);

export default router;
