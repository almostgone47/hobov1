const Review = require('../models/Review');
const Booking = require('../models/booking');

// gets all Reviews that belong to a user
exports.getUserReviews = (req, res) => {
  const { user } = res.locals;

  Review.find({ user: user.id })
    .then((reviews) => res.send(reviews))
    .catch((err) => res.mongoError(err));
};

// gets all Reviews that belong to a rental
exports.getRentalReviews = (req, res) => {
  const { user } = res.locals;

  Review.find({ rental: user.id })
    .then((reviews) => res.send(reviews))
    .catch((err) => res.mongoError(err));
};

// creates one new Review if booking belongs to logged in user and the booking hasn't been reviewed already
exports.createReview = async (req, res) => {
  const reviewData = req.body;
  const bookingId = req.body.booking;
  const currentUser = res.locals.user;

  let booking = await Booking.findById(bookingId)
    .populate('user')
    .populate('rental');

  if (currentUser.id === booking.user.id && !booking.isReviewed) {
    reviewData.user = currentUser.id;
    reviewData.rental = booking.rental.id;

    booking.isReviewed = true;
    await booking.save();
    console.log('Booking Saved: ', booking);
    try {
      const review = await Review.create(reviewData);
      res.json({ message: 'Review created successfully', review });
    } catch (err) {
      return res.mongoError(err);
    }
  } else {
    return res.status(422).send({
      errors: [
        {
          title: 'Booking Not Found',
          details: 'The booking you tried to review could not be found',
        },
      ],
    });
  }
};
