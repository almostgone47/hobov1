const Rental = require('../models/rental');
const Booking = require('../models/booking');

// gets all rentals by search query or all rentals if no search query is provided
exports.getRentals = async (req, res) => {
  const query = req.query.city ? { city: req.query.city.toLowerCase() } : {};

  try {
    const rentals = await Rental.find(query).populate('image');
    res.json(rentals);
  } catch (err) {
    return res.mongoError(err);
  }
};

// gets a single rental with owner details by rental._id
exports.getRentalById = (req, res) => {
  let id = req.params.id;

  Rental.findById(id, (err, rental) => {
    if (err) {
      return res.mongoError(err);
    }
    res.json(rental);
  })
    .populate('owner', '-password -_id')
    .populate('image');
};

// gets all rentals that belong to a user
exports.getUserRentals = (req, res) => {
  const { user } = res.locals;

  Rental.find({ owner: user.id })
    .populate('owner', '-password')
    .populate('image')
    .then((rentals) => res.send(rentals))
    .catch((err) => res.mongoError(err));
};

// edits a rental
exports.updateRental = async (req, res) => {
  const rentalId = req.params.id;
  const rentalData = req.body;
  const user = res.locals.user;

  try {
    const rental = await Rental.findById(rentalId).populate('owner');

    if (rental.owner.id !== user.id) {
      return res.status(422).send({
        errors: [
          {
            title: 'You are not the owner of this rental',
            details: 'Only the owner of a rental can edit rental details.',
          },
        ],
      });
    } else {
      rental.set(rentalData);
      await rental.save();
      const updatedRental = await Rental.findById(rentalId)
        .populate('owner')
        .populate('image');
      res.status(200).send(updatedRental);
    }
  } catch (err) {
    return res.mongoError(err);
  }
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

// deletes a rental if the rental has no future bookings and the user is the owner of the rental
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
    return res.mongoError(err);
  }
};

// verifies owner of rental is same as logged in
exports.verifyUser = async (req, res) => {
  const { user } = res.locals;
  const rentalId = req.params.id;
  try {
    const rental = await Rental.findById(rentalId).populate('owner');

    if (rental.owner.id !== user.id) {
      return res.send({
        errors: [
          {
            title: 'Invalid User',
            detail: 'You are not owner of this rental!',
          },
        ],
      });
    }

    return res.json({ status: 'verified' });
  } catch (err) {
    return res.mongoError(err);
  }
};
