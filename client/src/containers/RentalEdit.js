import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import EditableInput from '../components/RentalEdit/EditableInput';
import EditableTextarea from '../components/RentalEdit/EditableTextarea';
import EditableSelect from '../components/RentalEdit/EditableSelect';
import EditableImage from '../components/RentalEdit/EditableImage';
import Map from '../components/Map/Map';
import RentalAssets from '../components/Rental/RentalAssets';
import Layout from '../Layout/Layout';
import { capitalize, rentalType } from '../helpers';
import {
  fetchRental,
  fetchRentalLocation,
  resetRental,
  editRental,
  verifyRentalOwner,
} from '../store/actions';

const validateUser = (Component) => (props) => {
  const [guard, setGuard] = useState({ canProceed: false, isChecking: true });
  const { id } = props.match.params;

  useEffect(() => {
    verifyRentalOwner(id)
      .then(() => setGuard({ canProceed: true, isChecking: false }))
      .catch(() => setGuard({ canProceed: false, isChecking: false }));
  }, [id]);

  const { canProceed, isChecking } = guard;
  if (!isChecking && canProceed) {
    return <Component {...props} />;
  } else if (!isChecking && !canProceed) {
    return <Redirect to={'/'} />;
  } else {
    return <h1>Loading...</h1>;
  }
};

class RentalEdit extends Component {
  updateRental = (rentalData) => {
    const rentalId = this.props.match.params.id;
    return this.props.dispatch(editRental(rentalData, rentalId));
  };

  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRental(rentalId));
  }

  componentDidUpdate() {
    const inputAddress = `${this.props.rental.street}, ${this.props.rental.city}`;
    const apiKey = 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO';
    this.props.dispatch(fetchRentalLocation(inputAddress, apiKey));
  }

  componentWillUnmount() {
    this.props.dispatch(resetRental());
  }

  render() {
    const { rental } = this.props;
    return (
      <Layout>
        <section id="rentalEdit">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <EditableImage
                  inputObj={rental}
                  objProperty={'image'}
                  updateRental={this.updateRental}
                  transformView={(image) => image.url}
                  containerType={'block'}
                  className="rental-img mb-2"
                />
              </div>

              <div className="col-md-6">
                <Map rental={rental} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <div className="rental">
                  Shared Rental:
                  <EditableSelect
                    inputObj={rental}
                    objProperty={'shared'}
                    options={[true, false]}
                    containerType={'inline'}
                    className={`rental-type type-${rental.category}`}
                    updateRental={this.updateRental}
                  />
                  <EditableSelect
                    inputObj={rental}
                    objProperty={'category'}
                    options={['apartment', 'condo', 'house']}
                    className={`rental-type type-${rental.category}`}
                    updateRental={this.updateRental}
                  />
                  {rental.owner && (
                    <div className="rental-owner">
                      <img
                        src="https://api.adorable.io/avatars/285/abott@adorable.png"
                        alt="owner"
                      />
                      <span>{rental.owner.username}</span>
                    </div>
                  )}
                  <EditableInput
                    inputObj={rental}
                    objProperty={'title'}
                    className={'rental-title'}
                    updateRental={this.updateRental}
                  />
                  <h2 className="rental-city">
                    <EditableInput
                      inputObj={rental}
                      objProperty={'city'}
                      className={'rental-city'}
                      updateRental={this.updateRental}
                      transformView={(value) => capitalize(value)}
                    />
                  </h2>
                  <EditableInput
                    inputObj={rental}
                    objProperty={'street'}
                    className={'rental-street'}
                    updateRental={this.updateRental}
                    transformView={(value) => capitalize(value)}
                  />
                  <div className="rental-room-info mb-1">
                    <span>
                      <i className="fa fa-building"></i>
                      <EditableInput
                        inputObj={rental}
                        objProperty={'bedrooms'}
                        className={''}
                        containerType={'inline'}
                        updateRental={this.updateRental}
                      />{' '}
                      bedrooms
                    </span>
                    <span>
                      <i className="fa fa-user"></i> {rental.bedrooms + 4}{' '}
                      guests
                    </span>
                    <span>
                      <i className="fa fa-bed"></i> {rental.bedrooms + 2} beds
                    </span>
                  </div>
                  <EditableTextarea
                    inputObj={rental}
                    objProperty={'description'}
                    className={'rental-description'}
                    containerType={'inline'}
                    updateRental={this.updateRental}
                    rows={5}
                    cols={50}
                  />
                </div>
                <RentalAssets />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rental: state.rentalData.rental,
    errors: state.errorData.errors,
  };
};

const RentalEditWithRouterAndValidate = withRouter(validateUser(RentalEdit));
export default connect(mapStateToProps)(RentalEditWithRouterAndValidate);
