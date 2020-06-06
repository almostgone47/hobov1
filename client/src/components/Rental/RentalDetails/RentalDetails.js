import React, { Component } from 'react';
import { connect } from 'react-redux';

import SimpleMap from '../../Map/GoogleMap';
import RentalInfo from './RentalInfo';
import RentalAssets from './RentalAssets';
import * as actions from '../../../store/actions';

export class RentalDetails extends Component {
    
    componentDidMount() {
        const rentalId = this.props.match.params.id
        this.props.dispatch(actions.fetchRental(rentalId))
    }

    render() {
        const rental = this.props.rental
        return (
            <section id='rentalDetails'>
                <div className='upper-section'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={rental.image} alt=''></img>
                        </div>
                        <SimpleMap
                            height='100'
                            width='100'
                        />
                    </div>
                </div>

                <div className='details-section'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <RentalInfo rental={rental}/>
                            <RentalAssets />
                        </div>
                    <div className='col-md-4'> 
                        BOOKING
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
