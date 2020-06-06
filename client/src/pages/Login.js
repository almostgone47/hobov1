import React from 'react';
import LoginForm from '../components/form/LoginForm';
import * as actions from '../store/actions';
import { connect } from 'react-redux';
import Errors from '../components/shared/Errors';

const Login = (props) => {

    return (
        <div className="bwm-form">
            <div className="row">
                <div className="col-md-5">
                    <h1 className="page-title">Login</h1>
                    <LoginForm loginUser={(userData) => props.dispatch(actions.loginUser(userData, props.history))} />
                    { props.errors ? <Errors errors={props.errors} /> : '' }
                </div>
                <div className="col-md-6 ml-auto">
                    <div className="image-container">
                        <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                        <img src="/images/login-image.jpg" alt="Login an user" />
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

export default connect(mapStateToProps)(Login);
