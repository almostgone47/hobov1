const Rental = require('../models/rental');

exports.getRentals = (req, res) => {
    Rental.find({}, (err, rentals) => {
        if (err) { return res.mongoError(err) }
        res.json(rentals)
    })
}

exports.getRentalById = (req, res) => {
    let id = req.params.id;
    Rental.findById(id, (err, rental) => {
        if (err) { return res.mongoError(err) }
        res.json(rental)
    })
}

exports.createRental = (req, res) => {
    const rentalData = req.body;
    rentalData.owner = res.locals.user;

    Rental.create(rentalData, (err, rental) => {
        if (err) { return res.mongoError(err) }
        res.json({message: 'Rental created successfully', rental})
    })
}