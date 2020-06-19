import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkAuthState, fetchRentals } from './store/actions';
import AuthRoute from './components/shared/AuthRoute';
import Header from './components/shared/Header';
import RentalList from './pages/RentalList';
import RentalDetails from './pages/RentalDetails';
import RentalNew from './pages/RentalNew';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(checkAuthState());
    this.props.dispatch(fetchRentals());
  }

  render() {
    return (
      <BrowserRouter>
        <Header {...this.props}/>
        <div className='container'>
          <Route exact path="/" render={() => { return <Redirect to="/rentals" /> } } />
          <Route exact path="/rentals" component={RentalList} />
          <Route exact path="/rental/:id" component={RentalDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
          <AuthRoute path="/rentalnew" component={RentalNew} />
        </div>
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
