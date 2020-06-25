import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteBooking } from '../../store/actions';
import { capitalize, formatDate } from '../../helpers';

const BookingList = (props) => {
  const { bookings } = props;
  return (
    <div>
      <section className="booking-listing">
        <div className="row">
          {bookings &&
            bookings.map((booking) => (
              <div key={booking._id} className="col-md-4">
                <div className="card text-center">
                  <div className="card-header">
                    From: {booking.user.username}
                  </div>

                  <div className="card-block">
                    <h4 className="card-title">
                      {booking.rental.title} - {capitalize(booking.rental.city)}{' '}
                    </h4>
                    <p className="card-text booking-days">
                      {formatDate(booking.startAt)} -{' '}
                      {formatDate(booking.endAt)} | {booking.nights} nights
                    </p>
                    <p className="card-text">
                      <span>Price: </span>{' '}
                      <span className="booking-price-value">
                        ${booking.price}
                      </span>
                    </p>
                    <Link
                      to={{ pathname: `/rentals/${booking.rental._id}` }}
                      className="btn btn-main"
                    >
                      Go to Rental
                    </Link>
                    <button
                      onClick={() => props.dispatch(deleteBooking(booking._id))}
                      className="ml-1 btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="card-footer text-muted">
                    Created at {formatDate(booking.createdAt)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    bookings: state.bookingData.bookings,
  };
};

export default connect(mapStateToProps)(BookingList);
