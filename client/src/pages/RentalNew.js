import React, { Component } from 'react';
import RentalForm from '../components/forms/RentalForm';
import { connect } from 'react-redux';

import { newRental } from '../store/actions/index';
import Errors from '../components/shared/Errors';

export class RentalNew extends Component {

    createNewRental(rentalData) {
        this.props.dispatch(newRental(rentalData))
    }
    
    render() {
        return (
            <section id="newRental">
                <div className="hobov-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1 className="page-title">Create Rental</h1>
                            <RentalForm createNewRental={this.createNewRental} />
                            { this.props.errors ? <Errors errors={this.props.errors} /> : '' }
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
        errors: state.errorData.errors
    }
}

export default connect(mapStateToProps)(RentalNew);
