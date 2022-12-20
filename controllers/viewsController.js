const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using data from 1)

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });

  next(new AppError('Lets see what happens'));
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The forest Hiker Tour',
  });
};
