import { NextFunction, Request, Response } from 'express';
import { registerUser } from '../services/auth.service';
import passport from '../config/passport.config';
import { UserI } from '../interfaces/models/userI';
import { errorResponse, successResponse } from '../utils/response';

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
      .json(successResponse({ name, surname }, req.t('success.register')));
  } catch (error: any) {
    console.error('Error registering user:', error);
    res.status(500).json(errorResponse(req.t('error.internal')));
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (error: any, user: UserI, info: { message: any }) => {
      if (error) {
        console.error('Error logging in:', error);
        return res.status(500).json(errorResponse(req.t('error.internal')));
      }
      if (!user) {
        console.error('User not found:', error);
        return res.status(500).json(errorResponse(req.t('error.internal')));
      }

      // Log the user in and establish a session
      req.logIn(user, (error) => {
        if (error) {
          return next(error);
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
          .json(
            successResponse(
              { name: userResponse.name, surname: userResponse.surname },
              req.t('success.login'),
            ),
          );
      });
    },
  )(req, res, next);
};
