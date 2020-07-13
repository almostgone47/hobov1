import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewReviewForm from '../components/Review/NewReviewForm';
import Layout from '../Layout/Layout';
import { createReview } from '../store/actions';

class Review extends Component {
  createNewReview = (reviewData) => {
    // reviewData.isReviewed = true;
    this.props.dispatch(createReview(reviewData, this.props.booking._id));
  };

  render() {
    return (
      <Layout>
        <h2>Hostel Name</h2>
        <p>Hostel Address</p>
        <hr />
        <p>Help other travellers by telling a bit about your experience</p>
        <hr />
        <NewReviewForm createNewReview={this.createNewReview} />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    booking: state.bookingData.booking,
  };
};

export default connect(mapStateToProps)(Review);
