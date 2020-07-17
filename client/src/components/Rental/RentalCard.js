import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { rentalType } from '../../helpers/index';
import { setRental } from '../../store/actions';

const RentalCard = (props) => {
  const { rental, btnMenu, link, cardCol } = props;

  return (
    <div className={`card hobov-card ${cardCol}`}>
      <Link
        className="rental-detail-link d-flex"
        to={link}
        onClick={() => props.dispatch(setRental(rental))}
      >
        <div className="card-block col-md-8">
          <h4 className="card-title">{rental.title}</h4>
          <h6 className={`card-subtitle ${rental.category}`}>
            {rentalType(rental.shared)} {rental.category}&#183; {rental.city}
          </h6>
          <p className="card-text">
            ${rental.dailyRate} per Night &#183; Free Cancelation
          </p>
        </div>
        <img
          className="card-img-top col-md-4"
          src={rental.image.url}
          alt="rental"
        />
      </Link>
      {btnMenu && btnMenu()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(RentalCard);
