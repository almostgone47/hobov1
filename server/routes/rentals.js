const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

// gets all rentals
router.get('', controllers.getRentals);

// gets all rentals belonging to the logged in user
router.get('/user', onlyAuthUser, controllers.getUserRentals);

// gets a single rental by the rental.id
router.get('/:id', controllers.getRentalById);

// edit a rental
router.put('/:id', onlyAuthUser, controllers.updateRental);

// creates a new rental
router.post('/new', onlyAuthUser, controllers.createRental);

// deletes a single rental
router.delete('/:id', onlyAuthUser, controllers.deleteRental);

// checks rental owner is same as logged in
router.get('/:id/verify-user', onlyAuthUser, controllers.verifyUser);

module.exports = router;
