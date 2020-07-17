import React, { Component } from 'react';
import { connect } from 'react-redux';

import RentalCards from '../components/Rental/RentalCard';
import Map from '../components/Map/Map';
import Layout from '../Layout/Layout';
import { resetRentals, setRental } from '../store/actions';

class RentalList extends Component {
  componentWillUnmount() {
    this.props.dispatch(resetRentals());
  }

  renderRentals = (rentals) => {
    return rentals.map((rental) => {
      return (
        <RentalCards
          key={rental._id}
          cardCol="col-md-12"
          rental={rental}
          link={`/rental/${rental._id}`}
        />
      );
    });
  };

  render() {
    const yourHome = this.props.search
      ? `in "${this.props.search}"`
      : 'All Around the World!';
    const { rentals } = this.props;
    return (
      <Layout>
        <h1 className="page-title">Your Home {yourHome}</h1>
        <h5>{this.props.rentals.length} results found.</h5>
        <div className="row d-flex">
          <section className="col-md-7" id="rentalListing">
            <div className="row d-flex flex-column">
              {this.renderRentals(rentals)}
            </div>
          </section>
          <div className="col-md-4">
            <Map rental={rentals} />
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rentals: state.rentalData.rentals,
    search: state.rentalData.searchInput,
  };
};

export default connect(mapStateToProps)(RentalList);
