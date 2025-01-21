import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegistration } from '../middlewares/authMiddleware';

const router = express.Router();

// Register route
router.post('/register', validateRegistration, register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

export default router;
