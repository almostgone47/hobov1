import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../../Map/Map';
import RentalInfo from './RentalInfo';
import RentalAssets from './RentalAssets';
import * as actions from '../../../store/actions';
import Booking from '../../Booking/Booking';

class RentalDetails extends Component {
    
    componentDidMount() {
        const rentalId = this.props.match.params.id
        this.props.dispatch(actions.fetchRental(rentalId))
    }

    componentDidUpdate() {
        const inputAddress = `${this.props.rental.street}, ${this.props.rental.city}`;
        const apiKey = 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO' 
        this.props.dispatch(actions.fetchRentalLocation(inputAddress, apiKey))
    }

    componentWillUnmount() {
        this.props.dispatch(actions.resetRental())
    }

    render() {
        const { rental } = this.props;

        return (
            <section id='rentalDetails'>
                <div className='upper-section'>
                    <div className='row'>

                        <div className='col-md-6'>
                            <img src={rental.image} alt=''></img>
                        </div>

                        <div className='col-md-6'>
                            <Map rental={rental} />
                        </div>

                    </div>
                </div>

                <div className='details-section'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <RentalInfo rental={rental}/>
                            <RentalAssets />
                        </div>
                        <div className='col-md-4'> 
                            <Booking rental={rental}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rental: state.rentalData.rental
    }
}

export default connect(mapStateToProps)(RentalDetails);
