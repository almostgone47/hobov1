import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthRoute from './components/Auth/AuthRoute';
import RentalList from './containers/RentalList';
import RentalDetails from './containers/RentalDetails';
import RentalNew from './containers/RentalNew';
import RentalEdit from './containers/RentalEdit';
import Login from './containers/Login';
import Register from './containers/Register';
import UserProfile from './containers/UserProfile';
import BackOffice from './containers/BackOffice';
import { checkAuthState, fetchRentals } from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(checkAuthState());
    this.props.dispatch(fetchRentals());
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/rentals" />;
          }}
        />
        <Route exact path="/rentals" component={RentalList} />
        <Route exact path="/rental/:id" component={RentalDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthRoute path="/profile" component={UserProfile} />
        <AuthRoute path="/backoffice" component={BackOffice} />
        <AuthRoute path="/rentalnew" component={RentalNew} />
        <AuthRoute path="/rental/:id/edit" component={RentalEdit} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(App);
