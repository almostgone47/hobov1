import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import RentalList from './components/Rental/RentalList';
import RentalDetails from './components/Rental/RentalDetails';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Route exact path="/" component={RentalList} />
          <Route exact path="/test" component={RentalDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
