import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteBooking, setBooking } from '../../store/actions';
import { capitalize, formatDate } from '../../helpers';

const BookingList = (props) => {
  const { bookings, currentUser } = props;

  // review, if current user is booking.user && booking.isReviewed === false show review button
  let reviewStatus = (booking) => {
    if (currentUser.sub === booking.user._id && !booking.review) {
      return (
        <Link
          to={{ pathname: `/newreview` }}
          className="btn btn-main"
          onClick={() => props.dispatch(setBooking(booking))}
        >
          Add a Review
        </Link>
      );
    } else if (booking.review) {
      return <div>{booking.review.aveRating}</div>;
    } else {
      return <div>Not yet reviewed</div>;
    }
  };

  return (
    <section className="booking-listing">
      <div className="booking-list-grid-container">
        <div className="grid-header">
          <div>Property</div>
          <div>Update Booking</div>
          <div className="rating">Booking Details</div>
        </div>

        {bookings &&
          bookings.map((booking) => (
            <div key={booking._id} className="booking-area">
              <div className="property-details">
                <h4>{booking.rental.title}</h4>
                <p>
                  {booking.rental.street} {capitalize(booking.rental.city)}
                </p>
              </div>

              <div className="booking-edit">
                {reviewStatus(booking)}
                <button
                  onClick={() => props.dispatch(deleteBooking(booking._id))}
                  className="ml-1 btn btn-danger"
                >
                  Delete
                </button>
              </div>

              <div className="booking-details">
                <p>
                  {formatDate(booking.startAt)} - {formatDate(booking.endAt)}
                </p>
                <p>
                  Nights: {booking.nights} | Guests: {booking.guests}
                </p>
                <p>
                  <span>Price: </span>{' '}
                  <span className="booking-price-value">${booking.price}</span>
                </p>
                <p className="text-muted">
                  Created at {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    bookings: state.bookingData.bookings,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(BookingList);
