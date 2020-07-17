import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import {
  setClean,
  setSocial,
  setComfort,
  setLocation,
  setService,
  setSleep,
  setTotalAve,
} from '../../store/actions';

import bathtub from '../../images/bathtub.png';
import chair from '../../images/chair.png';
import chatBubble from '../../images/chatBubbles.png';
import coffeeCup from '../../images/coffeeCup.png';
import heart from '../../images/heart.png';
import star from '../../images/star.png';

const ReviewGraph = (props) => {
  const getRatingAverages = () => {
    const reviews = props.reviews;

    const ratingNames = [
      'cleanRating',
      'socialRating',
      'comfortRating',
      'locationRating',
      'serviceRating',
      'sleepRating',
    ];

    const actionNames = [
      setClean,
      setSocial,
      setComfort,
      setLocation,
      setService,
      setSleep,
    ];
    let totalAverage = 0;
    const numberOfReviews = reviews.length;
    // get average of each rating type from all reviews for this property and stores them in redux state
    ratingNames.forEach((rating, index) => {
      let sum = 0;
      reviews.forEach((review) => {
        sum += review[rating];
      });
      let average = sum / numberOfReviews;
      console.log('this is the GETRATINGSAVEERAGE: ', props);
      totalAverage += average;
      average = average.toFixed(1);
      props.dispatch(actionNames[index](average));
    });
    totalAverage = totalAverage / 6;
    totalAverage = totalAverage.toFixed(2);
    props.dispatch(setTotalAve(totalAverage));
  };

  // adds D3 bar graphs for each rating average
  const addGraph = () => {
    const {
      cleanRating,
      socialRating,
      comfortRating,
      locationRating,
      serviceRating,
      sleepRating,
    } = props;

    const ratings = [
      cleanRating,
      socialRating,
      comfortRating,
      locationRating,
      serviceRating,
      sleepRating,
    ];

    // creates an SVG area
    d3.select('.GraphContainer').selectAll('svg').remove();

    d3.select('.GraphContainer')
      .selectAll('.Rating')
      .data(ratings)
      .append('svg')
      .style('background', 'lightgrey')
      .style('border-radius', '5px')
      .style('margin-bottom', '2px')
      .attr('width', 250)
      .attr('height', 4)
      .attr('fill', '#00b4b4')
      .append('rect')
      .attr('width', (d) => d * 25)
      .attr('height', 4)
      .attr('x', 0)
      .attr('y', 0);
  };

  useEffect(() => {
    getRatingAverages();
    addGraph();
  });

  return (
    <>
      <h4 className="ReviewNum LeftNum">
        Average Rating <img src={star} />
        {props.totalAveRating} | {props.reviews.length}
      </h4>
      <span> reviews</span>
      <div className="GraphContainer">
        <div className="cleaning">
          <div className="top-row">Sparkling Clean</div>
          <div className="ImageCell top-row">
            <img src={bathtub} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.cleanRating}</div>
        </div>
        <div className="social">
          <div className="top-row">Social Scene</div>
          <div className="ImageCell top-row">
            <img src={chatBubble} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.socialRating}</div>
        </div>
        <div className="comfort">
          <div className="top-row">Outstanding Hospitality</div>
          <div className="ImageCell top-row">
            <img src={heart} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.comfortRating}</div>
        </div>
        <div className="location">
          <div className="top-row">Amazing Location</div>
          <div className="ImageCell top-row">
            <img src={chair} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.locationRating}</div>
        </div>
        <div className="service">
          <div className="top-row">Style & Amenities</div>
          <div className="ImageCell top-row">
            <img src={coffeeCup} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.serviceRating}</div>
        </div>
        <div className="sleep">
          <div className="top-row">Sleep Quality</div>
          <div className="ImageCell top-row">
            <img src={chair} />
          </div>
          <div className="Rating"></div>
          <div className="RatingNum">{props.sleepRating}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewData.reviews,
    cleanRating: state.reviewData.cleanRating,
    socialRating: state.reviewData.socialRating,
    comfortRating: state.reviewData.comfortRating,
    locationRating: state.reviewData.locationRating,
    serviceRating: state.reviewData.serviceRating,
    sleepRating: state.reviewData.sleepRating,
    totalAveRating: state.reviewData.totalAveRating,
  };
};

export default connect(mapStateToProps)(ReviewGraph);
