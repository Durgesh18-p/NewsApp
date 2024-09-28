import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Signup } from '../model/authentication.js';

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Controller for Signup
export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const result = await Signup.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Store the token in a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'Strict' });

    // Respond with the user data (excluding the token in the response body)
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller for Login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await Signup.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Store the token in a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'Strict' });

    // Respond with the user data (excluding the token in the response body)
    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller for Logout (optional)
export const userLogout = async (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
