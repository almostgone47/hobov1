const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rentals');


router.get('', controllers.getRentals);

router.get('/:id', controllers.getRentalById);

router.post('', controllers.createRental);

module.exports = router;