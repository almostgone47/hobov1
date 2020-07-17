import React from 'react';

import star from '../../images/star.png';

const ReviewCard = ({ review }) => {
  return (
    <div className="ReviewCard">
      <div className="ReviewHeader">
        <img src={star} />
        <div className="NameDate">
          <p className="Name">{review.user.username}</p>
          <p className="Date">{review.createdAt}</p>
        </div>
        <div className="ReviewHeadAve">{review.aveRating}</div>
      </div>
      <h5>{review.title}</h5>
      <p className="ReviewBody">{review.body}</p>
      <hr />
      <div className="ReviewRatingCol">
        <div>
          <ul>
            <li>Cleanliness</li>
            <li>Social Scene</li>
            <li>Comfort</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="CardNums">{review.cleanRating}.0</li>
            <li className="CardNums">{review.socialRating}.0</li>
            <li className="CardNums">{review.comfortRating}.0</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Location</li>
            <li>Customer Service</li>
            <li>Sleep</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="CardNums">{review.locationRating}.0</li>
            <li className="CardNums">{review.serviceRating}.0</li>
            <li className="CardNums">{review.sleepRating}.0</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
