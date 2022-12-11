const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReviews);
router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createNewReview
  );

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
