const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser} = require('../controllers/authController').default;

// middleware
router.use(
  cors({
    credentials: true,
    origine:'http:localhost:5173'
  })
)
  router.get('/',test)
  router.post('/register' , registerUser)

  module.exports = router

