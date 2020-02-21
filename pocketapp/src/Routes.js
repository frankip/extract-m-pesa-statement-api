import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';
import PrivateRoutes from './PrivateRoutes'
// # import EventCardDetails from './components/EventCardDetails';
// # import Myevents from './components/myEvents';


export default () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes
          exact path="/" 
          component={Main} 
          authenticated={authenticated} 
         />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Registration} />
        {/* # <Route path="/events/:id" component={EventCardDetails} />
        # <Route path="/myevents" component={Myevents} /> */}
      </Switch>
    </Router>
  );
}