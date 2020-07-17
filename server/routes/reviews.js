const express = require('express');
const router = express.Router();
const controllers = require('../controllers/reviews');
const { onlyAuthUser } = require('../controllers/users');

// get reviews for a user by their user id
router.get('/user', onlyAuthUser, controllers.getUserReviews);

// get all reviews for each rental
router.get('/rental/:id', controllers.getRentalReviews);

// create a new review
router.post('/new', onlyAuthUser, controllers.createReview);

module.exports = router;
