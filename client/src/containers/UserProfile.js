import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../Layout/Layout';
import BookingList from '../components/Booking/BookingList';
import { getUserBookings } from '../store/actions';

export class UserProfile extends Component {
  componentDidMount() {
    this.props.dispatch(getUserBookings());
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Your User Profile </h2>
          <h3>Upcoming Bookings</h3>
          <BookingList />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookings: state.bookingData.bookings,
  };
};

export default connect(mapStateToProps)(UserProfile);
