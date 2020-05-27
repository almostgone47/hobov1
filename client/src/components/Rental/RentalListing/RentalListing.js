import React, { Component } from 'react';
import RentalCards from './RentalCard';

class RentalList extends Component {

    renderRentals() {
        return this.props.rentals.map((rental, index) => {
            return <RentalCards 
                        key={index}
                        colNum="col-md-3 col-xs-4"
                        rental={rental} />
        })
    }

    render() {
        return (
            <div className='row d-flex justify-content-around'>
                {this.renderRentals()}
            </div>
        )
    }
}

export default RentalList;
