import React from 'react';
import RentalCards from '../components/RentalList/RentalCard';
import { connect } from 'react-redux';

const RentalList = (props) => {
    const yourHome = props.search ? `in "${props.search}"` : 'All Around the World!'
    return (
        <section id='rentalListing'>
            <h1 className='page-title'>Your Home {yourHome}</h1>
            <h5>{props.rentals.length} results found.</h5>
            <div className='row d-flex justify-content-around'>
                {
                    props.rentals.map((rental, index) => {
                        return <RentalCards 
                            key={index}
                            colNum="col-md-3 col-xs-4"
                            rental={rental} />
                    })
                }
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    console.log('STATE RENTAL LIST: ', state)
    return {
        rentals: state.rentalData.rentals,
        search: state.rentalData.searchInput
    }
}

export default connect(mapStateToProps)(RentalList);