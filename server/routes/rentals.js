const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');


router.get('', (req, res) => {
    Rental.find({}, (err, rentals) => {
        res.json(rentals)
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Rental.findById(id, (err, rental) => {
        if (err) {
            res.status(422).send({errors: [{title: 'Rental Error', details: 'Could not find rental.' }]})
        }
        res.json(rental)
    })
})

module.exports = router;