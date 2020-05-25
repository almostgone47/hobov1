import React, { Component } from 'react';
import RentalCards from './RentalCard';
import rentalData from './rentalData';

export default class RentalList extends Component {
    state = {
        rentals: rentalData.rentals
    }

    renderRentals() {
        return this.state.rentals.map((rental, index) => {
            return <RentalCards 
                        key={index}
                        colNum="col-md-3 col-xs-4"
                        rental={rental} />
        })
    }

    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row d-flex justify-content-around'>
                    {this.renderRentals()}
                </div>
            </section>
        )
    }
}
