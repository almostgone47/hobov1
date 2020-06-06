import React from 'react';
import RegisterForm from '../components/form/RegisterForm';
import * as actions from '../store/actions';
import Errors from '../components/shared/Errors';
import { connect } from 'react-redux';

const Register = (props) => {

    return (
        <div className="bwm-form">
            <div className="row">
                <div className="col-md-5">
                    <h1 className="page-title">Register</h1>
                    <RegisterForm registerUser={(userData) => props.dispatch(actions.registerUser(userData, props.history))}/>
                    { props.errors ? <Errors errors={props.errors} /> : '' }
                </div>
                <div className="col-md-6 ml-auto">
                    <div className="image-container">
                        <h2 className="catchphrase">As our member you have access to most awesome places in the world.</h2>
                        <img src="/images/register-image.jpg" alt="Register an user" />
                    </div>
                </div>
            </div>
        </div> 
    )
}


const mapStateToProps = state => {
    return {
        errors: state.rentalData.errors
    }
}

export default connect(mapStateToProps)(Register);
