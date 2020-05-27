import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

export class RentalDetails extends Component {
    
    componentDidMount() {
        const rentalId = this.props.match.params.id
        this.props.dispatch(actions.fetchRental(rentalId))
    }

    render() {
        console.log('something!: ', this.props)
        return (
            <div className='card-block'>
                {this.props.rental.title}
                {this.props.rental.city}
                {this.props.rental.dailyRate}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rental: state.rentalData.rental
    }
}

export default connect(mapStateToProps)(RentalDetails);
