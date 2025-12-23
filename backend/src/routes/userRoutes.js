import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);



// Protected routes
router.post('/logout', authenticateToken, logoutUser);
router.get('/profile', authenticateToken, getUserProfile);


export default router;