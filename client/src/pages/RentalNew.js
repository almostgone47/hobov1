import React, { Component } from 'react';
import RentalForm from '../components/form/RentalForm';
import { newRental } from '../store/actions/index';
import { connect } from 'react-redux';

export class RentalNew extends Component {

    createNewRental(rentalData) {
        newRental(rentalData)
    }
    
    render() {
        return (
            <section id="newRental">
                <div className="bwm-form">
                    <div className="row">
                    <div className="col-md-5">
                        <h1 className="page-title">Create Rental</h1>
                        <RentalForm createNewRental={this.createNewRental} />
                        {/* <div>
                        <p>
                            Some Errors
                        </p>
                        </div> */}
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="image-container">
                        <h2 className="catchphrase">Hundreds of awesome places within reach of a few clicks.</h2>
                        <img src="/images/create-rental.jpg" alt="" />
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(RentalNew);
