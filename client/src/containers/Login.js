import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/Auth/LoginForm';
import Errors from '../components/shared/Errors';
import Layout from '../Layout/Layout';
import { loginUser } from '../store/actions';

const Login = (props) => {
  return (
    <Layout>
      <div className="hobov-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            <LoginForm
              loginUser={(userData) =>
                props.dispatch(loginUser(userData, props.history))
              }
            />
            {props.errors ? <Errors errors={props.errors} /> : ''}
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Hundreds of awesome places in reach of few clicks.
              </h2>
              <img src="/images/login-image.jpg" alt="Login an user" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errorData.errors,
  };
};

export default connect(mapStateToProps)(Login);
