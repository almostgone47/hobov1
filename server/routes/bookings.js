const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');

// get all bookings, no Auth: used by client side booking module to block out booked dates
router.get('', controllers.getBookingAvailability);

// get bookings for a user by their user id
router.get('/user', onlyAuthUser, controllers.getUserBookings);

// get all rentals and all bookings for each rental
router.get('/owner', onlyAuthUser, controllers.getAllRentalOwnersBookings);

// get all bookings for a property by their rental id
router.get('/rental/:id', onlyAuthUser, controllers.getRentalBookings);

// edit a booking
router.put('/:id', onlyAuthUser, controllers.updateBooking);

// get a single booking by the booking id
router.get('/:id', onlyAuthUser, controllers.getBooking);

// create a new booking
router.post('/new', onlyAuthUser, controllers.createBooking);

// deletes one booking
router.delete('/:id', onlyAuthUser, controllers.deleteBooking);

module.exports = router;
