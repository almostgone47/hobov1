import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Errors from '../components/shared/Errors';
import RentalCard from '../components/Rental/RentalCard';
import BookingList from '../components/Booking/BookingList';
import Layout from '../Layout/Layout';
import {
  fetchRentalsByOwner,
  fetchRental,
  getBookingsByOwner,
  getBookings,
  deleteRental,
  resetRentals,
  resetErrors,
} from '../store/actions';

class BackOffice extends Component {
  getBookingsForRental(rentalId) {
    this.props.dispatch(getBookings(rentalId));
  }

  deleteRental(rentalId) {
    const confirmMsg =
      'Are you sure you would like to delete this property? It cannot be undone.';
    if (window.confirm(confirmMsg)) {
      this.props.dispatch(deleteRental(rentalId));
    }
  }

  componentDidMount() {
    this.props.dispatch(getBookingsByOwner());
    this.props.dispatch(fetchRentalsByOwner());
  }

  componentWillUnmount() {
    this.props.dispatch(resetRentals());
    this.props.dispatch(resetErrors());
  }

  render() {
    return (
      <Layout>
        <section id="rentalListing">
          <h2 className="page-title">My Rental Properties</h2>
          <Errors errors={this.props.errors} />
          <div className="row d-flex justify-content-around">
            {this.props.rentals.map((rental) => {
              return (
                <RentalCard
                  key={rental._id}
                  rental={rental}
                  link={`/rental/${rental._id}/bookings`}
                  btnMenu={() => (
                    <>
                      <button
                        onClick={() =>
                          this.props.dispatch(fetchRental(rental._id))
                        }
                        className="btn btn-warning"
                      >
                        <Link to={`/rental/${rental._id}/edit`}>Edit</Link>
                      </button>
                      <button
                        onClick={() => this.deleteRental(rental._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                />
              );
            })}
          </div>
          <div>
            <h2 className="page-title">All Bookings</h2>
            <BookingList />
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentalData.rentals,
    bookings: state.bookingData.bookings,
    errors: state.errorData.errors,
  };
};

export default connect(mapStateToProps)(BackOffice);
