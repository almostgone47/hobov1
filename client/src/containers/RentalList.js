import React from 'react';
import { connect } from 'react-redux';

import RentalCards from '../components/RentalList/RentalCard';
import Layout from '../Layout/Layout';

const RentalList = (props) => {
    const yourHome = props.search ? `in "${props.search}"` : 'All Around the World!';

    return (
        <Layout>
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
        </Layout>
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