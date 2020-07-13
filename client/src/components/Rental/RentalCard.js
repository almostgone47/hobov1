import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { rentalType } from '../../helpers/index';
import { setRental } from '../../store/actions';

const RentalCard = (props) => {
  const { rental, btnMenu, link, cardCol } = props;
  const cardClass = `card hobov-card ${rental.colNum}`;
  return (
    <div className={`card hobov-card ${cardCol}`}>
      <Link
        className="rental-detail-link"
        to={link}
        onClick={() => props.dispatch(setRental(rental))}
      >
        <img className="card-img-top" src={rental.image.url} alt="rental" />
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
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(RentalCard);
