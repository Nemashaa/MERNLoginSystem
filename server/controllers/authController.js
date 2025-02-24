const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/auth');
const logger = require('../utils/logger'); // Import logger

// Test Endpoint
const test = (req, res) => {
  logger.info('Test endpoint accessed');
  res.json('Test is working');
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      logger.warn('Registration failed: Name is required');
      return res.json({ error: 'Name is required' });
    }

    if (!password || password.length < 6) {
      logger.warn('Registration failed: Weak password');
      return res.json({ error: 'Password should be at least 6 characters long' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      logger.warn(`Registration failed: Email ${email} already taken`);
      return res.json({ error: 'Email is already taken' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    logger.info(`New user registered: ${email}`);
    return res.json(user);
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: No user found with email ${email}`);
      return res.json({ error: 'No user found' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      logger.warn(`Login failed: Incorrect password for email ${email}`);
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    logger.info(`User logged in: ${email}`);
    res.json({ accessToken, user });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Refresh Token Endpoint
const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    logger.warn('Token refresh failed: No refresh token provided');
    return res.status(403).json({ error: 'Refresh token not found' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      logger.warn('Token refresh failed: Invalid refresh token');
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    logger.info(`New access token issued for user ID: ${user.id}`);
    res.json({ accessToken: newAccessToken });
  });
};

// Logout Endpoint
const logoutUser = (req, res) => {
  res.clearCookie('refreshToken');
  logger.info(`User logged out: ${req.user?.id || 'Unknown user'}`);
  res.json({ message: 'Logged out successfully' });
};

// Get Profile Endpoint
const getProfile = (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      logger.warn('Profile access denied: No access token provided');
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          logger.warn('Profile access failed: Access token expired');
          return res.status(403).json({ success: false, message: 'Access token expired' });
        }
        logger.warn('Profile access failed: Invalid access token');
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }

      logger.info(`Profile accessed for user ID: ${user.id}`);
      res.json(user);
    });
  } catch (error) {
    logger.error(`Profile access error: ${error.message}`);
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
