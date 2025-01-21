import express from 'express';
import { register, login } from '../controllers/auth.controller';
import passport from 'passport';
import { validateRegistration } from '../middlewares/authMiddleware';
import { UserI } from '../interfaces/models/userI';

const router = express.Router();

// Register route
router.post('/register', validateRegistration, register);

// Login route
router.post(
  '/login',
  passport.authenticate('local', {
    session: false, // disable session for login endpoint
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/failure',
  }),
);

// Check authentication success
router.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'Login successful!', user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated.' });
  }
});

// Check authentication failure
router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Login failed. Invalid email or password.' });
});

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
