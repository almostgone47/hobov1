import React from 'react';
import { Link } from 'react-router-dom';

import { rentalType } from '../../helpers/index';

const RentalCard = ({ rental, btnMenu, link }) => {
  return (
    <div className={rental.colNum}>
      <div className="card hobov-card">
        <Link className="rental-detail-link" to={link}>
          <img className="card-img-top" src={rental.image} alt="rental" />
          <div className="card-block">
            <h6 className={`card-subtitle ${rental.category}`}>
              {rentalType(rental.shared)} {rental.category}&#183; {rental.city}
            </h6>
            <h4 className="card-title">{rental.title}</h4>
            <p className="card-text">
              ${rental.dailyRate} per Night &#183; Free Cancelation
            </p>
          </div>
        </Link>
        {btnMenu && btnMenu()}
      </div>
    </div>
  );
};

export default RentalCard;
