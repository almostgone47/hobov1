const Rental = require('../models/rental');
const Booking = require('../models/booking');

// gets all rentals by search query or all rentals if no search query is provided
exports.getRentals = (req, res) => {
  const query = req.query.city ? { city: req.query.city.toLowerCase() } : {};

  Rental.find(query, (err, rentals) => {
    if (err) {
      return res.mongoError(err);
    }
    res.json(rentals);
  });
};

// gets a single rental with owner details by rental._id
exports.getRentalById = (req, res) => {
  let id = req.params.id;

  Rental.findById(id, (err, rental) => {
    if (err) {
      return res.mongoError(err);
    }
    res.json(rental);
  }).populate('owner', '-password -_id');
};

// creates one new rental
exports.createRental = (req, res) => {
  const rentalData = req.body;
  rentalData.owner = res.locals.user;

  Rental.create(rentalData, (err, rental) => {
    if (err) {
      return res.mongoError(err);
    }
    res.json({ message: 'Rental created successfully', rental });
  });
};

exports.deleteRental = async (req, res) => {
  const rentalId = req.params.id;
  const { user } = res.locals;
  try {
    const rental = await Rental.findById(rentalId).populate('owner');
    const bookings = await Booking.find({ rental });

    if (user.id !== rental.owner.id) {
      return res.status(422).send({
        errors: [
          {
            title: 'Ivalid User',
            details: 'Only the rental owner can delete this rental.',
          },
        ],
      });
    }

    if (bookings && bookings.length > 0) {
      return res.status(422).send({
        errors: [
          {
            title: 'This rental has active bookings',
            details:
              'You must delete all bookings before you can delete this rental.',
          },
        ],
      });
    }
    await rental.remove();
    return res.json({ id: rentalId });
  } catch (err) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid User',
          details: 'There was an error trying to delete this property.',
        },
      ],
    });
  }
};
