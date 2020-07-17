import React from 'react';
import star from '../images/star.png';

const ReviewHeader = (props) => {
  return (
    <>
      <div>
        <h4 className="Reviews">Reviews</h4>
        <h4 className="ReviewNum LeftNum">
          Overall Average Rating <img src={star} />
          {props.totalAverageRating}
        </h4>
        <h4 className="ReviewNum RightNum">{props.reviews.length} </h4>
        <span>reviews</span>
      </div>
    </>
  );
};

export default ReviewHeader;
