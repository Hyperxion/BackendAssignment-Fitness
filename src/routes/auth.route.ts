import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { userValidationSchema } from '../validations/user.validation';

const router = express.Router();

// Register route
router.post('/register', validateRequest(userValidationSchema), register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

export default router;
