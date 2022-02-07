const path = require('path');
const express = require('express');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const color = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
//security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

// load env vars
require('dotenv').config();

//connect DB
connectDB();

//routes file
const bootcamps = require('./routes/bootcamp');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
//
const app = express();

app.use(cors());
//Body Parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//file uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//
app.get('/', (req, res, next) => {
  res.send('Hello from Duong Ace');
});
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

// Moutn error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode by Duong Ace on port ${PORT}  `
      .yellow.bold
  );
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // server.close(() => process.exit());
});
