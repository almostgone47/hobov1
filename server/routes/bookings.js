const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');

// get all bookings, no Auth: used by client side booking module to block out booked dates
router.get('', controllers.getBookings);

// get bookings for a user by their user id
router.get('/user', onlyAuthUser, controllers.getUserBookings);

// get a single booking by the booking id
router.get('/:id', onlyAuthUser, controllers.getBooking);

// get all bookings for a property by their rental id
router.get('/rental/:id', onlyAuthUser, controllers.getRentalBookings);

// create a new booking
router.post('/new', onlyAuthUser,  controllers.createBooking);

// deletes one booking
router.delete('/:id', onlyAuthUser,  controllers.deleteBooking);

module.exports = router;