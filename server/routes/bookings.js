const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');

router.get('', controllers.getBookings);

router.get('/:bookingId', controllers.getBooking);

router.post('/new', onlyAuthUser,  controllers.createBooking);

module.exports = router;