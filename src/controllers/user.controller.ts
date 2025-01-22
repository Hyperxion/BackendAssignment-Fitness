import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { successResponse, errorResponse } from '../utils/response';
import { fetchAllUsers, fetchUserById } from '../services/user.service';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
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
