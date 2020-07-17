import React from 'react';
import { connect } from 'react-redux';

import ReviewCard from './ReviewCard';
import ReviewPagination from './ReviewPagination';
import ReviewGraph from './ReviewGraph';

const ReviewList = ({ reviews }) => {
  return (
    <>
      <div className="ReviewBody">
        <div className="ReviewTop">
          <div>
            <ReviewGraph />
          </div>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
          <ReviewPagination
            reviews={reviews}
            // currentPage={this.state.currentPage}
            // pageForward={this.pageForward}
            // pageBack={this.pageBack}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewData.reviews,
  };
};

export default connect(mapStateToProps)(ReviewList);
