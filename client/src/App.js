import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthRoute from './components/shared/AuthRoute';
import RentalList from './containers/RentalList';
import RentalDetails from './containers/RentalDetails';
import RentalNew from './containers/RentalNew';
import Login from './containers/Login';
import Register from './containers/Register';
import MyProfile from './containers/MyProfile';
import MyProperty from './containers/MyProperty';
import { checkAuthState, fetchRentals } from './store/actions';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(checkAuthState());
    this.props.dispatch(fetchRentals());
  }

  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" render={() => { return <Redirect to="/rentals" /> } } />
          <Route exact path="/rentals" component={RentalList} />
          <Route exact path="/rental/:id" component={RentalDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthRoute path="/profile" component={MyProfile} />
          <AuthRoute path="/property" component={MyProperty} />
          <AuthRoute path="/rentalnew" component={RentalNew} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      user: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(App);
