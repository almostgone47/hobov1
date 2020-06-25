import React, { Component } from 'react';
import { connect } from 'react-redux';

import RentalCards from '../components/Rental/RentalCard';
import Layout from '../Layout/Layout';
import { resetRentals } from '../store/actions';

class RentalList extends Component {
  componentWillUnmount() {
    this.props.dispatch(resetRentals());
  }

  render() {
    const yourHome = this.props.search
      ? `in "${this.props.search}"`
      : 'All Around the World!';

    return (
      <Layout>
        <section id="rentalListing">
          <h1 className="page-title">Your Home {yourHome}</h1>
          <h5>{this.props.rentals.length} results found.</h5>
          <div className="row d-flex justify-content-around">
            {this.props.rentals.map((rental, index) => {
              return (
                <RentalCards
                  key={index}
                  colNum="col-md-3 col-xs-4"
                  rental={rental}
                  link={`/rental/${rental._id}`}
                />
              );
            })}
          </div>
        </section>
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
