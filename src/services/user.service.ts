import { User } from '../models/user.model';

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
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
