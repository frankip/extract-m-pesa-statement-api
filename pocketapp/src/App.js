import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {isTokenExpired } from "./components/url_config";

// local imports
import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';
import PrivateRoutes from './PrivateRoutes'

import './static/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTokenExpired: true,
      token: '',

    };
  }

  render() {
  const {  isTokenExpired} = this.state;
    return (
      <Router>
        <Switch>
        <PrivateRoutes
          exact path="/" 
          component={Main} 
          authenticated={isTokenExpired} 
         />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Registration} />
      </Switch>
      </Router>
    );
  }
}

export default App