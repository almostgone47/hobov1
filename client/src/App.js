import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkAuthState } from './store/actions';
import Header from './components/shared/Header';
import RentalList from './components/Rental/RentalListing/RentalList';
import RentalDetails from './components/Rental/RentalDetails/RentalDetails';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(checkAuthState())
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
