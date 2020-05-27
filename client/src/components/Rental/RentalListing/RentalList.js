import React, { Component } from 'react';
import RentalListing from './RentalListing';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class RentalList extends Component {

    componentDidMount() {
        this.props.dispatch(actions.fetchRentals())
    }

    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <RentalListing rentals={this.props.rentals} />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rentals: state.rentalData.rentals
    }
}

export default connect(mapStateToProps)(RentalList);
