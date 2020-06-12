const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');

// router.get('', controllers.getBookings);

// router.get('/:id', controllers.getBookingById);

router.post('/new', onlyAuthUser,  controllers.createBooking);

module.exports = router;