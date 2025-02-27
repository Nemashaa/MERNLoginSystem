const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, refreshAccessToken, logoutUser ,getProfile} = require('../controllers/authController');
const jwt =  require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getProfile);
router.post('/refreshToken', refreshAccessToken);
router.post('/logout', logoutUser);

module.exports = router;
