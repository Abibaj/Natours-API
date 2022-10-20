///// THIRD-PARTY MODULES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

///// OUR OWN MODULES
// ERROR HANDLER MODULES
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//
const app = express();

///// MIDDLEWARES
app.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public/overview.html`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
