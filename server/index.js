const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler'); 
const logger = require('./utils/logger'); // Added Logger
const morganLogger = require('./utils/morganLogger'); 

const app = express();

// Use morganLogger middleware to log HTTP requests
app.use(morganLogger); // This will log all HTTP requests

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => logger.info('Database Connected'))
  .catch((err) => logger.error(`Database Connection Failed: ${err.message}`));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Routes
app.use('/', authRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

const port = 8000;
app.listen(port, () => {
  logger.log('info', `Server is running on port ${port}`);
});