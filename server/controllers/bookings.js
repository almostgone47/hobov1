const Booking = require('../models/booking');
const moment = require('moment');

// gets all bookings for availability
exports.getBookings = (req, res) => {
  const rental = req.query.rentalId;

  Booking.find({ rental })
    .select('startAt endAt')
    .then((bookings) => res.send(bookings))
    .catch(() =>
      res.status(422).send({
        errors: [
          {
            title: 'Invalid Dates',
            details: 'Could not retrieve the requested bookings.',
          },
        ],
      })
    );
};

// gets all of a user's bookings
exports.getUserBookings = (req, res) => {
  const { user } = res.locals;

  Booking.find({ user })
    .populate('user', '-password')
    .populate('rental')
    .then((bookings) => res.send(bookings))
    .catch(() =>
      res.status(422).send({
        errors: [
          {
            title: 'Invalid Request',
            details: 'Could not retreive the requested user bookings.',
          },
        ],
      })
    );
};

// gets a single booking by the booking's id
exports.getBooking = (req, res) => {
  const bookingId = req.params.id;

  Booking.find({ _id: bookingId })
    .populate('rental')
    .populate('user', '-password')
    .then((booking) => res.send(booking))
    .catch(() =>
      res.status(422).send({
        errors: [
          {
            title: 'Invalid Dates',
            details: 'Could not retreive the requested booking.',
          },
        ],
      })
    );
};

// gets all bookings that belong to a rental property
exports.getRentalBookings = (req, res) => {
  const rentalId = req.params.id;

  Booking.find({ rental: rentalId })
    .populate('user', '-password')
    .then((booking) => res.send(booking))
    .catch(() =>
      res.status(422).send({
        errors: [
          {
            title: 'Invalid Dates',
            details: 'Could not retreive the requested rental bookings.',
          },
        ],
      })
    );
};

// finds a single booking, checks that only the owner of the booking is able to delete booking and checks that the booking is not within the rental's required cancellation time, then deletes it
exports.deleteBooking = async (req, res) => {
  const CANCELLATION_DAYS = 3;
  const bookingId = req.params.id;
  const { user } = res.locals;
  try {
    const booking = await Booking.findById(bookingId).populate('user');

    if (user.id !== booking.user.id) {
      return res.status(422).send({
        title: 'Ivalid User',
        details: 'Only the owner of this booking can delete it',
      });
    }

    if (moment(booking.startAt).diff(moment(), 'days') > CANCELLATION_DAYS) {
      await booking.remove();
      return res.json({ id: bookingId });
    } else {
      return res
        .status(422)
        .send('Booking cannont be deleted unless more than 3 days prior');
    }
  } catch (err) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid Dates',
          details: 'Could not retreive the requested booking.',
        },
      ],
    });
  }
};

// checks booking is valid and available, then creates new booking
exports.createBooking = async (req, res) => {
  const bookingData = req.body;

  const newBooking = new Booking(bookingData);
  newBooking.user = res.locals.user;
  if (!checkValidBookingDates(newBooking)) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid Dates',
          details: 'The dates requested are invalid dates.',
        },
      ],
    });
  }

  try {
    const bookings = await Booking.find({ rental: newBooking.rental });
    const isValid = checkAvailability(newBooking, bookings);
    if (isValid) {
      const savedBooking = await newBooking.save();
      const allBookings = bookings.concat(savedBooking);
      return res.json({ bookings: allBookings });
    } else {
      return res.status(422).send({
        errors: [
          {
            title: 'Dates Unvailable',
            details:
              'These dates are already booked. Please try different dates.',
          },
        ],
      });
    }
  } catch (err) {
    return res.mongoError(err);
  }
};

// checks dates were entered and that start date is before end date
const checkValidBookingDates = (newBooking) => {
  let isValid = true;

  if (!newBooking.startAt || !newBooking.endAt) {
    isValid = false;
  }
  if (newBooking.startAt > newBooking.endAt) {
    isValid = false;
  }

  return isValid;
};

// checks dates are not overlapping
const checkAvailability = (newBooking, bookings) => {
  let isValid = true;

  if (bookings && bookings.length > 0) {
    isValid = bookings.every((booking) => {
      const checkStart = newBooking.startAt;
      const checkEnd = newBooking.endAt;

      const alreadyBookedStart = booking.startAt;
      const alreadyBookedEnd = booking.endAt;

      return (
        (alreadyBookedStart < checkStart && alreadyBookedEnd < checkEnd) ||
        (checkEnd < alreadyBookedEnd && checkEnd < alreadyBookedStart)
      );
    });
  }

  return isValid;
};
