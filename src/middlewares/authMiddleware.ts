import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized access. Please log in.' });
};

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, name, surname, nickName, age, role } = req.body;

  if (!email || !password || !name || !surname || !nickName || !age) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters.' });
  }

  next();
};
