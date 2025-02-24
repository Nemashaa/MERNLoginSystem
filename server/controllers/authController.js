// authController.js
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/auth');

// Test Endpoint
const test = (req, res) => {
  res.json('test is working');
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if name was entered
    if (!name) {
      return res.json({
        error: 'name is required'
      });
    }

    // Check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: 'password is required and should be at least 6 characters long'
      });
    }

    // Check email uniqueness
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'email is taken already'
      });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'no user found'
      });
    }

    // Check if password match
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });

    res.json({ accessToken, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Refresh Token Endpoint
const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ error: 'Refresh token not found' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};


// Logout Endpoint (Clear Refresh Token)
const logoutUser = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

// Get Profile Endpoint with proper error handling
const getProfile = (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ success: false, message: 'Access token expired' });
        }
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
      res.json(user);
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  refreshAccessToken,
  logoutUser
};
