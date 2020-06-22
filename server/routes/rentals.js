const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

router.get('', controllers.getRentals);

router.get('/:id', controllers.getRentalById);

router.post('/new', onlyAuthUser, controllers.createRental);

router.delete('/:id', onlyAuthUser, controllers.deleteRental);

module.exports = router;
