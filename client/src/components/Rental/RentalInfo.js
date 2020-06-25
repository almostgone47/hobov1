import React from 'react';
import { capitalize, rentalType } from '../../helpers';
import { connect } from 'react-redux';

const RentalInfo = ({ rental }) => {
  return (
    <div className="rental">
      <h2 className={`rental-type ${rental.category}`}>
        {rentalType(rental.shared)} {rental.category}
      </h2>
      {rental.owner && (
        <div className="rental-owner">
          <img
            src="https://api.adorable.io/avatars/285/abott@adorable.png"
            alt="owner"
          />
          <span>{rental.owner.username}</span>
        </div>
      )}
      <h1 className="rental-title">{rental.title}</h1>
      <h2 className="rental-city">{capitalize(rental.city)}</h2>
      <div className="rental-room-info">
        <span>
          <i className="fa fa-building"></i>
          {rental.bedrooms} bedrooms
        </span>
        <span>
          <i className="fa fa-user"></i> {rental.bedrooms + 4} guests
        </span>
        <span>
          <i className="fa fa-bed"></i> {rental.bedrooms + 2} beds
        </span>
      </div>
      <p className="rental-description">{rental.description}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rental: state.rentalData.rental,
  };
};

export default connect(mapStateToProps)(RentalInfo);
