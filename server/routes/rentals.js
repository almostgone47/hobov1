const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

router.get('', controllers.getRentals);

router.get('/:id', controllers.getRentalById);

router.post('', onlyAuthUser,  controllers.createRental);

module.exports = router;