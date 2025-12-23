import express from 'express';

const router = express.Router();

// Placeholder for auth routes
router.get('/test', (req, res) => res.json({ message: 'Auth route working' }));

export default router;