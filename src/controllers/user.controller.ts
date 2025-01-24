import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { successResponse, errorResponse } from '../utils/response';
import {
  fetchAllUsers,
  fetchUserById,
  getOwnProfileService,
} from '../services/user.service';
import { UserI } from '../interfaces/models/userI';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user: UserI = req.user as UserI;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const adminFilters = {
      role: req.query.role,
      age: req.query.age,
      name: req.query.name,
      surname: req.query.name,
      nickName: req.query.name,
      email: req.query.email,
    };

    const userFilters = {
      nickName: req.query.name,
      id: req.query.id,
    };

    const filters = user.role === 'ADMIN' ? adminFilters : userFilters;

    const attributes =
      user.role === 'ADMIN'
        ? ['id', 'name', 'surname', 'email', 'nickName', 'age', 'role']
        : ['id', 'nickName'];

    const users = await fetchAllUsers(page, limit, attributes, filters);
    res.status(200).json(successResponse(users, 'List of all users.'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

// Get user details
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    res
      .status(200)
      .json(successResponse(user, 'User details fetched successfully.'));
  } catch (error) {
    res
      .status(error.message === 'User not found.' ? 404 : 500)
      .json(errorResponse(error.message));
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Fields to update: name, surname, nickName, age, role

    delete updates.password; // We do not want to allow user's password changes

    /**
     * We might as well uncomment this line to inform admins about forbidden action
     */
    // if ('password' in updates) {
    //   return res
    //     .status(403)
    //     .json(errorResponse('Password updates are not allowed.'));
    // }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json(errorResponse('User not found.'));
    }

    await user.update(updates);

    res.status(200).json(successResponse(user, 'User updated successfully.'));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json(errorResponse('Failed to update user.'));
  }
};

/**
 * Get own profile info with tracked exercises
 */
export const getOwnProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const profile = await getOwnProfileService(user.id);

    res
      .status(200)
      .json(
        successResponse(profile, 'Your profile data fetched successfully.'),
      );
  } catch (error) {
    console.error('Error fetching profile:', error);
    res
      .status(500)
      .json(errorResponse(error.message || 'Failed to fetch profile data.'));
  }
};
