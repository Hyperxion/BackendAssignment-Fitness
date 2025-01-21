import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { UserI } from '../interfaces/models/userI';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
export const registerUser = async (
  data: Omit<UserI, 'id'> & { password: string },
) => {
  const { email, password, name, surname, nickName, age, role } = data;

  // Check if the email or nickname is already taken
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email is already registered.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the user
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    surname,
    nickName,
    age,
    role,
  });

  return user;
};

// Authenticate a user
export const authenticateUser = async (
  email: string,
  password: string,
): Promise<{ token: string; user: UserI }> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' },
  );

  // Return token and user data
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      surname: user.surname,
      nickName: user.nickName,
      email: user.email,
      age: user.age,
      role: user.role,
    },
  };
};
