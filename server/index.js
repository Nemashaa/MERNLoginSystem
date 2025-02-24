// index.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Import error handler

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not Connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/', authRoutes);

// Global Error Handler Middleware (should be placed after routes)
app.use(errorHandler);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
