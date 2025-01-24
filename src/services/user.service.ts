import Exercise from '../models/exercise.model';
import TrackedExercise from '../models/trackedExercise.model';
import { User } from '../models/user.model';
import { paginate } from '../utils/paginationHelper';
import { buildWhereClause } from '../utils/filterHelper';

// Fetch all users
export const fetchAllUsers = async (
  page: number,
  limit: number,
  attributes: string[],
  filters: Record<string, any>,
  search?: string,
) => {
  try {
    const where = buildWhereClause(
      { ...filters, search },
      ['role', 'age'],
      'nickName',
    );

    return await paginate(User, { where, attributes }, page, limit);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users.');
  }
};

// Fetch user details by ID
export const fetchUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error(error.message);
  }
};

// Update user by ID
export const updateUserById = async (
  id: string,
  updates: Record<string, any>,
) => {
  try {
    // Prevent updating the password
    delete updates.password;

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found.');
    }

    await user.update(updates);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(error.message);
  }
};

export const getOwnProfileService = async (userId: string) => {
  const profile = await User.findByPk(userId, {
    attributes: ['name', 'surname', 'age', 'nickName'],
    include: [
      {
        model: TrackedExercise,
        as: 'trackedExercises',
        include: [
          {
            model: Exercise,
            as: 'exercise',
            attributes: ['name', 'difficulty'],
          },
        ],
        attributes: ['id', 'startDate', 'endDate', 'duration'],
      },
    ],
  });

  if (!profile) {
    throw new Error('Profile not found.');
  }

  return profile;
};
