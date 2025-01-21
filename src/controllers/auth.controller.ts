import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/auth.service';

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
    res.status(201).json({ message: `User ${name} registered successfully!` });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login endpoint
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);
    res.status(200).json({ message: 'Login successful!', token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
