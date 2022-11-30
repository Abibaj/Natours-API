const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(reviewController.getAllReviews);
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createNewReview
  );

module.exports = router;
