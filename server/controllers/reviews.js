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
  Review.find({ rental: req.params.id })
    .populate('user')
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
    .populate('review')
    .populate('rental');

  if (currentUser.id === booking.user.id && !booking.review) {
    reviewData.user = currentUser.id;
    reviewData.rental = booking.rental.id;

    // get overall rating from average of input
    const ratings = [
      reviewData.cleanRating,
      reviewData.socialRating,
      reviewData.comfortRating,
      reviewData.locationRating,
      reviewData.serviceRating,
      reviewData.sleepRating,
    ];

    reviewData.aveRating = (
      ratings.reduce((acc, curr) => Number(acc) + Number(curr)) / ratings.length
    ).toFixed(1);

    try {
      const review = await Review.create(reviewData);
      booking.review = review;
      booking.save();

      res.json({ message: 'Review created successfully', review });
    } catch (err) {
      return res.mongoError(err);
    }
  } else {
    if (booking.review) {
      return res.status(423).send({
        errors: [
          {
            title: 'Cannot Review Booking',
            details:
              'This booking has already been reviewed and can only be reviewed once',
          },
        ],
      });
    }
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
