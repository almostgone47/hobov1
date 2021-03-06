import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map/Map';
import RentalInfo from '../components/Rental/RentalInfo';
import RentalAssets from '../components/Rental/RentalAssets';
import ReviewList from '../components/Review/ReviewList';
import Booking from '../components/Booking/Booking';
import Layout from '../Layout/Layout';
import {
  fetchRentalReviews,
  fetchRentalLocation,
  resetRental,
  resetBookings,
} from '../store/actions';

class RentalDetails extends Component {
  componentDidUpdate() {
    const inputAddress = `${this.props.rental.street}, ${this.props.rental.city}`;
    const apiKey = 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO';
    // this.props.dispatch(fetchRentalLocation(inputAddress, apiKey));
    this.props.dispatch(fetchRentalReviews(this.props.rental._id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetRental());
    this.props.dispatch(resetBookings());
  }

  render() {
    const { rental } = this.props;
    return (
      <Layout>
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img className="rental-img" src={rental.image.url} alt=""></img>
              </div>

              <div className="col-md-6">
                <Map rental={rental} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalInfo />
                <RentalAssets />
                <ReviewList />
              </div>
              <div className="col-md-4">
                <Booking />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rental: state.rentalData.rental,
    errors: state.errorData.errors,
  };
};

export default connect(mapStateToProps)(RentalDetails);
