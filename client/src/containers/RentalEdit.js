import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map/Map';
import RentalInfo from '../components/Rental/RentalInfo';
import RentalAssets from '../components/Rental/RentalAssets';
import Layout from '../Layout/Layout';
import {
  fetchRental,
  fetchRentalLocation,
  resetRental,
} from '../store/actions';

class RentalDetails extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRental(rentalId));
  }

  componentDidUpdate() {
    const inputAddress = `${this.props.rental.street}, ${this.props.rental.city}`;
    const apiKey = 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO';
    this.props.dispatch(fetchRentalLocation(inputAddress, apiKey));
  }

  componentWillUnmount() {
    this.props.dispatch(resetRental());
  }

  render() {
    const { rental } = this.props;
    return (
      <Layout>
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt=""></img>
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
