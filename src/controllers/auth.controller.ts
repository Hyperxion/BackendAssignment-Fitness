import { NextFunction, Request, Response } from 'express';
import { registerUser } from '../services/auth.service';
import passport from '../config/passport.config';
import { UserI } from '../interfaces/models/userI';

// Register endpoint
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, surname, nickName, age, role } = req.body;
    const user = await registerUser({
      email,
      password,
      name,
      surname,
      nickName,
      age,
      role,
    });
    res
      .status(201)
      .json({ message: `User ${name} ${surname} registered successfully!` });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  // Use Passport to authenticate with the 'local' strategy
  passport.authenticate(
    'local',
    (err: any, user: UserI, info: { message: any }) => {
      if (err) {
        // Handle unexpected errors
        return next(err);
      }
      if (!user) {
        // If authentication fails, return a 401 Unauthorized response
        return res
          .status(401)
          .json({ message: info?.message || 'Invalid credentials.' });
      }

      // Log the user in and establish a session
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        // Filter sensitive fields from the user object
        const userResponse: UserI = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          nickName: user.nickName,
          email: user.email,
          age: user.age,
          role: user.role,
        };

        // Return a success response
        res
          .status(200)
          .json({ message: 'Login successful!', user: userResponse });
      });
    },
  )(req, res, next);
};
